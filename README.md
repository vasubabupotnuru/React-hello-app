This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


##### ZIp modifications --- 07/07/2020

Modifications in class UsersDetailExcelReportGenerator.java file


	@Override
	public InputStreamResource getInputStreamResource (UserReportResponse reportResponse) throws IOException {
	return reportResponse.getReportDetailsList().size() > 0
			&& (reportResponse.getErrorMessage() == null || reportResponse.getErrorMessage().isEmpty()) ?
	// this line 
					new InputStreamResource (getInputStream(usersTOExcel (reportResponse.getReportDetailsList()))) : null;
	}
	
	// changes return type to workbook
	
	// this line
	public Workbook usersTOExcel(List<UserReportDetails> userReportDetails) throws IOException {
		final Workbook workbook = new XSSFWorkbook();
		Sheet sheet = workbook.createSheet("UsersDetailReport");
		setColumnswidth(sheet);
		createSheetHeader (workbook, sheet);
		createSheetBody(userReportDetails, sheet);
	// this line 
		return workbook;
	}

####################################################################################3

changes in UsersSummaryExcelReportGenerator.java file 



private static final String[] SHEET_COLUMNS = {"Activated?", "Migrated?", "FP Verfied?", "Count"};
	private static final int DEFAULT_COLUMN_WIDTH = 25;
	private int total=0;

	// add these two lines
	@Autowired
	UserMgmtPortalReportService userMgmtPortalReportService;

	@Override
	public InputStreamResource getInputStreamResource (UserReportResponse reportResponse) throws IOException {
		total=reportResponse.getReportDetailsList().size();
		
	// this line also
		reportResponse.setSummaryList(userMgmtPortalReportService.retrieveUserDetailsSummery(reportResponse));
		
		return reportResponse.getSummaryList().size() > 0
				&& (reportResponse.getErrorMessage() == null || reportResponse.getErrorMessage().isEmpty()) ?
				new InputStreamResource (usersTOExcel (reportResponse.getSummaryList())) : null;
	}


##############################################################################################################################################
comment these lines in UserMgmtPortalReportsController.java file


@PostMapping (value="/usersReport")
	public ResponseEntity<?> generateReport(@RequestBody UsersReportSearchDetails reportSearchDetails) throws IOException {
		final ReportGenerator reportGenerator = reportGeneratorFactory.getFileGenerator(reportSearchDetails.getReportFormatType());
		if (reportGenerator != null) {
			 Optional<UserReportResponse> reportResponse = userMgmtPortalReportService.retrieveUserDetailsByCriteria(reportSearchDetails);
			//valuee => report generated valuel => userReportResponse with error message, when there is exception
			
		// comment these lines 
			/*if(reportSearchDetails.getReportFormatType().equals(ReportTypeEnum.USERS_REPORT_SUMMARY_EXCEL.getReportType())){
				reportResponse.orElse(null).setSummaryList(userMgmtPortalReportService.retrieveUserDetailsSummery(reportResponse.orElse(null)));
			}*/
			
			
			Pair<InputStreamSource, UserReportResponse> pairReportOrErrorResponse = reportGenerator.generateReport(reportResponse.orElse(null));
			return pairReportOrErrorResponse.getValue0() != null ?
					ResponseEntity.ok()
						.headers(getHttpHeaders(reportGenerator.getReportName(reportSearchDetails.getReportFormatType())))
						.body(pairReportOrErrorResponse.getValue0()):
					ResponseEntity.badRequest()
						.body (pairReportOrErrorResponse.getValue1());
		} else {
			return ResponseEntity.badRequest()
					.body (new UserReportResponse(SC_BAD_REQUEST,
							"No file generators matching the report reportFormatType or " +
							"at least one report Type must be specified by the user or invalid reportType"));
		}
	}

###################################################################################################################################333
Replace Complete file ReportGenerator.java file


import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.poi.ss.usermodel.Workbook;
import org.javatuples.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;



@Component
public class ZipReportGenerator implements ReportGenerator {

	@Autowired
	UsersDetailExcelReportGenerator usersDetailExcelReportGenerator;

	@Override
	public InputStreamResource getInputStreamResource (UserReportResponse reportResponse) throws IOException {
		Workbook workbook = usersDetailExcelReportGenerator.usersTOExcel(reportResponse.getReportDetailsList());

		return reportResponse.getReportDetailsList().size() > 0
				&& (reportResponse.getErrorMessage() == null || reportResponse.getErrorMessage().isEmpty()) ?
				new InputStreamResource (getZipStream (workbook,reportResponse)): null;
	}

	private InputStream getZipStream(Workbook workbook, UserReportResponse reportResponse) throws IOException{
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		ZipOutputStream zipOutputStream = new ZipOutputStream(out);

		// Adding excel report to zip
		ByteArrayOutputStream workbookByteArrayStream= new ByteArrayOutputStream();;
		ZipEntry zipEntry = new ZipEntry("report.xlsx");
		zipOutputStream.putNextEntry(zipEntry);
		workbook.write(workbookByteArrayStream);
		zipEntry.setSize(workbookByteArrayStream.size());
		zipOutputStream.write(workbookByteArrayStream.toByteArray());
		zipOutputStream.closeEntry();
		// End of adding excel

		// Adding json to report to zip
		ByteArrayOutputStream jsonByteArrayStream= new ByteArrayOutputStream();;
		ZipEntry zipEntryForJosn = new ZipEntry("report.json");
		zipOutputStream.putNextEntry(zipEntryForJosn);
		ObjectMapper mapper = new ObjectMapper ();
		mapper.writeValue (jsonByteArrayStream, reportResponse.getReportDetailsList());
		zipEntryForJosn.setSize(jsonByteArrayStream.size());
		zipOutputStream.write(jsonByteArrayStream.toByteArray());
		zipOutputStream.closeEntry();
		// End of adding excel

		zipOutputStream.close();
		return new ByteArrayInputStream(out.toByteArray());
	}

	@Override
	public String getFileGeneratorType() {
		return USERS_REPORTS_ZIP.getReportType();
	}
} 



######################################END################################################################




### Actual code-splitting vasu

create class UserSummary.java in model package



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSummary {
	private String activated;
	private String migrated;
	private String fpVerified;
	private int count;
}

###############################################################
add one line UserReportResponse.java  -- line no 114


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties ("reportDetailsList")
public class UserReportResponse {
	private int statusCode;
	private String errorMessage;
	List<UserReportDetails> reportDetailsList = new ArrayList<>(0);
	
	// this one 
	List<UserSummary> summaryList = new ArrayList<>(0);
	
	
	public UserReportResponse(int statusCode, String errorMessage) {
		this.statusCode = statusCode;
		this.errorMessage = errorMessage;
	}
}
############################################################################

add one line in UserMgmtPortalReportService.java file -- 133


@Service
public interface UserMgmtPortalReportService {
	Optional<UserReportResponse> retrieveUserDetailsByCriteria(UsersReportSearchDetails reportSearchDetails)
			throws UnsupportedEncodingException;
	
	// this one
	List<UserSummary> retrieveUserDetailsSummery(UserReportResponse userReportResponse)
			throws UnsupportedEncodingException;			
			
}


#########################################################################################33

add three methods in UserMgmtPortalReportServiceImpl.java file 


 

import static java.lang.String.valueOf;
import static org.apache.http.HttpStatus.SC_BAD_REQUEST;

import java.util.*;

import static java.util.Arrays.asList;

import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.javatuples.Triplet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


@Service
public class UserMgmtPortalReportServiceImpl implements UserMgmtPortalReportService {
	private static final Logger LOG = LoggerFactory.getLogger(UserMgmtPortalReportServiceImpl.class);
	private OktaFinderService oktaFinderService;
	private UserSearchCriteriaValidator validationHelper;
	
	public UserMgmtPortalReportServiceImpl(OktaFinderService oktafinderService, UserSearchCriteriaValidator validationHelper) {
		this.oktaFinderService = oktafinderService;
		this.validationHelper = validationHelper;
	}
	
	public Optional<UserReportResponse> retrieveUserDetailsByCriteria(UsersReportSearchDetails reportSearchDetails) {
		UserReportResponse defaultUserReportResponse = new UserReportResponse();
		try {
			//searchCriteriaEmpty valuee -> isDateRangeEmpty, valuel > isstatusTypesEmpty, value2 > isUserTypesEmpty
			final Triplet<Boolean, Boolean, Boolean> searchCriteriaEmpty = validationHelper.validateSearchCriteriaParamsEmpty(reportSearchDetails);
			final Optional<UserReportResponse> oktaReportResponse = oktaFinderService.findListofAllUsers();
			return oktaReportResponse.map(userReportResponse -> {
				userReportResponse.setReportDetailsList(oktaReportResponse
						.map(response -> response.getReportDetailsList().parallelStream()
								.filter(reportDetails -> canIncludeUserReportDetail(reportSearchDetails, reportDetails, searchCriteriaEmpty))
								.collect (Collectors.toList()))
						.orElse(Collections.emptyList()));
				return userReportResponse;
			});
		}catch(Exception e) {
			LOG. error("Exception at UserMgmtPortalReportServiceImpl::retrieveUserDetailsByCriteria ", e);
			defaultUserReportResponse.setErrorMessage("Exception at UserMgmtPortalReportServiceImpl::retrieveUserDetailsByCriteria :" + e.getMessage ());
			defaultUserReportResponse.setStatusCode(SC_BAD_REQUEST);
		}		
		return Optional.of(defaultUserReportResponse);
	
	}

	// this method 1
	@Override
	public List<UserSummary> retrieveUserDetailsSummery(UserReportResponse userReportResponse) {
		final Map<String, Map<String, Map<String, List<UserReportDetails>>>> usersByStatusMigratedAndFp = userReportResponse.getReportDetailsList().stream().collect(
				Collectors.groupingBy(UserReportDetails::getStatus,
						groupByMigratedAndFpVerfied()
				)
		);
		return convertToSummaryList(usersByStatusMigratedAndFp);
	}

	private boolean canIncludeUserReportDetail(UsersReportSearchDetails searchCriteria, UserReportDetails reportDetail,
											   Triplet<Boolean, Boolean, Boolean> searchCriteriaEmpty) {
		return (searchCriteriaEmpty.getValue0() || isUserFilteredByDateRange (reportDetail, searchCriteria)) &&
				(searchCriteriaEmpty.getValue1() || isUserFilteredByStatusTypes(reportDetail, asList(searchCriteria.getStatusTypes ()))) &&
				(searchCriteriaEmpty.getValue2() || isUserFilteredByUserTypes (asList(searchCriteria.getUserTypes ()), reportDetail)) &&
				isUserFilteredByOktaId(reportDetail);
	} 
		
	private boolean isUserFilteredByDateRange (UserReportDetails reportDetails, UsersReportSearchDetails reportSearchDetails) {
		String startDate = reportSearchDetails.getStartDate() != null ? reportSearchDetails.getStartDate() :"";
		String endDate = reportSearchDetails.getEndDate() != null ? reportSearchDetails.getEndDate(): "";
		String createdDate = reportDetails.getCreatedDate() != null ? reportDetails.getCreatedDate(): "";
		try {
			return (isDateEmpty(startDate) || (isGivenDateAfterStartDate(createdDate, startDate)))
					&& (isDateEmpty(endDate) || (isGivenDateBeforeEndDate(createdDate, endDate)));
		} catch (Exception e) {
			LOG. error("Error occurred when parsing Creation Date from Okta for user Id" +reportDetails.getId());
			return false;
		}
	}
		
	private boolean isUserFilteredByStatusTypes (UserReportDetails reportDetails, List<String> statusTypes) {
		return statusTypes.stream().anyMatch (statusType ->
			(statusType.equals (ACTIVATED.getStatusTypeValue ())
					&& reportDetails.getProfileEmailVerified() != null && reportDetails.getProfileEmailVerified())
					|| (statusType.equals (NOT_ACTIVATED.getStatusTypeValue())
					&& reportDetails.getProfileEmailVerified() != null && reportDetails.getProfileEmailVerified()));
	}
	
	private boolean isUserFilteredByUserTypes(List<String> userTypes, UserReportDetails reportDetails) {
		return userTypes.stream().anyMatch(userType ->
			(userType.equals(REGISTERED_VERIFIED.getUserType()) && isUserNewlyRegistered (reportDetails) && isUserVerified(reportDetails))
				|| (userType.equals (REGISTERED_NOT_VERIFIED.getUserType()) && isUserNewlyRegistered(reportDetails) && !isUserVerified(reportDetails))
				|| (userType.equals (MIGRATED_VERIFIED.getUserType()) && isUserMigrated (reportDetails) && isUserVerified(reportDetails))
				|| (userType.equals (MIGRATED_NOT_VERIFIED.getUserType()) && isUserMigrated (reportDetails) && !isUserVerified(reportDetails)));
	}
	
	private boolean isUserFilteredByOktaId(UserReportDetails reportDetail) {
		return reportDetail.getProfileOktaid() != null;
	}
	private boolean isUserVerified(UserReportDetails reportDetails) {
		return reportDetails.getProfileVerification() != null && reportDetails.getProfileVerification();
	}
	private boolean isUserMigrated (UserReportDetails reportDetails) {
		return reportDetails.getProfileOktaid() != null
			&& Long.parseLong(valueOf(reportDetails.getProfileOktaid())) < oktaIdLimit;
	}
	private boolean isUserNewlyRegistered(UserReportDetails reportDetails) {
		return reportDetails.getProfileOktaid() != null
			&& Long.parseLong (valueOf(reportDetails.getProfileOktaid())) >= oktaIdLimit;
	}
	
	// this method 2 
	private Collector<UserReportDetails, ?, Map<String, Map<String, List<UserReportDetails>>>> groupByMigratedAndFpVerfied() {
		return Collectors.groupingBy(UserReportDetails::getMigrated, Collectors.groupingBy(p -> p.getFpVerified()));
	}
	
	// this method 3  
	
	private List<UserSummary> convertToSummaryList(Map<String, Map<String, Map<String, List<UserReportDetails>>>> usersByStatusMigratedAndFp) {
		List<UserSummary> userSummaryList=new ArrayList<>();
		String lastStatus="";
		String lastMigrated="";
		for(String status: usersByStatusMigratedAndFp.keySet()){
			for(String migrated:usersByStatusMigratedAndFp.get(status).keySet()){
				for(String fp:usersByStatusMigratedAndFp.get(status).get(migrated).keySet()){
					UserSummary userSummary= new UserSummary();
					userSummary.setActivated(status.equals(lastStatus)?"":status);
					userSummary.setMigrated(status.equals(lastStatus) && migrated.equals(lastMigrated)?"":migrated);
					userSummary.setFpVerified(fp);
					userSummary.setCount(usersByStatusMigratedAndFp.get(status).get(migrated).get(fp).size());
					userSummaryList.add(userSummary);
					lastStatus=status;
					lastMigrated=migrated;
				}
			}
		}
		return userSummaryList;
	}
}

######################################################################################################3
Replace complete UsersSummaryExcelReportGenerator.java file 

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@Component
public class UsersSummaryExcelReportGenerator implements ReportGenerator {

	private static final String[] SHEET_COLUMNS = {"Activated?", "Migrated?", "FP Verfied?", "Count"};
	private static final int DEFAULT_COLUMN_WIDTH = 25;
	private int total=0;
	@Override
	public InputStreamResource getInputStreamResource (UserReportResponse reportResponse) throws IOException {
		total=reportResponse.getReportDetailsList().size();
		return reportResponse.getSummaryList().size() > 0
				&& (reportResponse.getErrorMessage() == null || reportResponse.getErrorMessage().isEmpty()) ?
				new InputStreamResource (usersTOExcel (reportResponse.getSummaryList())) : null;
	}
	public InputStream usersTOExcel(List<UserSummary> summaryList) throws IOException {
		final Workbook workbook = new XSSFWorkbook();
		Sheet sheet = workbook.createSheet("SummaryReport");
		setColumnswidth(sheet);
		createSheetHeader (workbook, sheet);
		createSheetBody(summaryList, sheet);
		return getInputStream(workbook);
	}
	private void createSheetHeader (Workbook workbook, Sheet sheet) {
		Row headerRow = sheet.createRow(0);
		for (int col = 0; col < SHEET_COLUMNS.length; col++) {
			Cell cell = headerRow.createCell(col);
			cell.setCellValue(SHEET_COLUMNS[col]);
			cell.setCellStyle(getCellstyle(workbook));
		}
	}
	private void createSheetBody (List<UserSummary> summaryList, Sheet sheet) {
		int rowIdx = 1;
		Row row;
		for (UserSummary summaryReport : summaryList) {
			row = sheet.createRow(rowIdx++);
			fillUserSummary(row, summaryReport);
		}
		fillGrandTotal(sheet.createRow(rowIdx++));
	}
	private InputStream getInputStream(Workbook workbook) throws IOException {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		workbook.write(out);
		return new ByteArrayInputStream(out.toByteArray());
	}
	private CellStyle getCellstyle(Workbook workbook) {
		CellStyle headerCellstyle = workbook.createCellStyle();
		headerCellstyle.setFont (getFontForHeader (workbook));
		return headerCellstyle;
	}
	private Font getFontForHeader (Workbook workbook) {
		Font font = workbook.createFont();
		font.setBold(true);
		font.setColor(IndexedColors.BLACK.getIndex());
		return font;
	}
	private void fillUserSummary (Row row, UserSummary summaryReport) {
		row.createCell(0).setCellValue (summaryReport.getActivated());
		row.createCell(1).setCellValue(summaryReport.getMigrated());
		row.createCell(2). setCellValue (summaryReport.getFpVerified());
		row.createCell(3).setCellValue (summaryReport.getCount());
	}
	private void fillGrandTotal (Row row) {
		row.createCell(0).setCellValue ("Grand Total");
		row.createCell(3).setCellValue (total);
	}
	private void setColumnswidth(Sheet sheet) {
		sheet.setDefaultColumnWidth(DEFAULT_COLUMN_WIDTH);
	}
	@Override
	public String getFileGeneratorType() {
		return USERS_REPORT_SUMMARY_EXCEL.getReportType();
	}
}  


########################################################################################333

Add one condition in UserMgmtPortalReportsController.java file 


	@PostMapping (value="/usersReport")
	public ResponseEntity<?> generateReport(@RequestBody UsersReportSearchDetails reportSearchDetails) throws IOException {
		final ReportGenerator reportGenerator = reportGeneratorFactory.getFileGenerator(reportSearchDetails.getReportFormatType());
		if (reportGenerator != null) {
			 Optional<UserReportResponse> reportResponse = userMgmtPortalReportService.retrieveUserDetailsByCriteria(reportSearchDetails);
			//valuee => report generated valuel => userReportResponse with error message, when there is exception
			// this method 
			if(reportSearchDetails.getReportFormatType().equals(ReportTypeEnum.USERS_REPORT_SUMMARY_EXCEL.getReportType())){
				reportResponse.orElse(null).setSummaryList(userMgmtPortalReportService.retrieveUserDetailsSummery(reportResponse.orElse(null)));
			}
			
			Pair<InputStreamSource, UserReportResponse> pairReportOrErrorResponse = reportGenerator.generateReport(reportResponse.orElse(null));
			return pairReportOrErrorResponse.getValue0() != null ?
					ResponseEntity.ok()
						.headers(getHttpHeaders(reportGenerator.getReportName(reportSearchDetails.getReportFormatType())))
						.body(pairReportOrErrorResponse.getValue0()):
					ResponseEntity.badRequest()
						.body (pairReportOrErrorResponse.getValue1());
		} else {
			return ResponseEntity.badRequest()
					.body (new UserReportResponse(SC_BAD_REQUEST,
							"No file generators matching the report reportFormatType or " +
							"at least one report Type must be specified by the user or invalid reportType"));
		}
	}


