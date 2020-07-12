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
