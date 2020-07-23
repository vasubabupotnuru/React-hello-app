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


##### Color pelette  modifications --- 23/07/2020 ---- UsersSummaryExcelReportGenerator.java

// check all functions andi 

	private static final String[] SHEET_COLUMNS = {"Activated?", "Migrated?", "FP Verfied?", "Count"};
	private static final int DEFAULT_COLUMN_WIDTH = 25;
	private int total=0;

	XSSFCellStyle centerAlignment;
	XSSFCellStyle oddRow;
	XSSFCellStyle evenRow;
	XSSFCellStyle centerAlignmentWithBold;
	Font font;
	Font headerFont;
	
	
	
	
	@Override
	public InputStreamResource getInputStreamResource (UserReportResponse reportResponse) throws IOException {
		total=reportResponse.getReportDetailsList().size();
		reportResponse.setSummaryList(userMgmtPortalReportService.retrieveUserDetailsSummery(reportResponse));
		return reportResponse.getSummaryList().size() > 0
				&& (reportResponse.getErrorMessage() == null || reportResponse.getErrorMessage().isEmpty()) ?
				new InputStreamResource (usersTOExcel (reportResponse.getSummaryList())) : null;
	}
	public InputStream usersTOExcel(List<UserSummary> summaryList) throws IOException {
		final Workbook workbook = new XSSFWorkbook();
		prerequisites(workbook);
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

	private void prerequisites(Workbook workbook) {
		centerAlignment =(XSSFCellStyle) workbook.createCellStyle();
		centerAlignment.setAlignment(HorizontalAlignment.CENTER);
		try {
			byte[] rgbB = Hex.decodeHex("CCCCFF"); // get byte array from hex string
			XSSFColor color = new XSSFColor(rgbB, null); //IndexedColorMap has no usage until now. So it can be set null.
			centerAlignment.setFillForegroundColor(color);
			centerAlignment.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		}catch (Exception e){

		}
		setFont(workbook);
		centerAlignmentWithBold =(XSSFCellStyle) workbook.createCellStyle();
		centerAlignmentWithBold.setAlignment(HorizontalAlignment.CENTER);
		centerAlignmentWithBold.setFont(font);
		try {
			byte[] rgbB = Hex.decodeHex("B3B3FF"); // get byte array from hex string
			XSSFColor color = new XSSFColor(rgbB, null); //IndexedColorMap has no usage until now. So it can be set null.
			centerAlignmentWithBold.setFillForegroundColor(color);
			centerAlignmentWithBold.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		}catch (Exception e){

		}

		oddRow = (XSSFCellStyle) workbook.createCellStyle();
		try {
			byte[] rgbB = Hex.decodeHex("CCCCFF"); // get byte array from hex string
			XSSFColor color = new XSSFColor(rgbB, null); //IndexedColorMap has no usage until now. So it can be set null.
			oddRow.setFillForegroundColor(color);
			oddRow.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		}catch (Exception e){

		}
		evenRow = (XSSFCellStyle) workbook.createCellStyle();
		try {
			byte[] rgbB = Hex.decodeHex("B3B3FF"); // get byte array from hex string
			XSSFColor color = new XSSFColor(rgbB, null); //IndexedColorMap has no usage until now. So it can be set null.
			evenRow.setFillForegroundColor(color);
			evenRow.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		}catch (Exception e){

		}
	}

	private void createSheetBody (List<UserSummary> summaryList, Sheet sheet) {
		int rowIdx = 1;
		int mergeIndex=1;
		Row row;
		for (UserSummary summaryReport : summaryList) {
			if(rowIdx>2 && summaryReport.getActivated().length()>0){
				mergeRegion(sheet,mergeIndex,rowIdx-1,0,0);
				sheet.createRow(rowIdx++);
				mergeIndex=rowIdx;
			}
			row = sheet.createRow(rowIdx++);
			fillUserSummary(rowIdx,row, summaryReport);
		}
		mergeRegion(sheet,mergeIndex,rowIdx-1,0,0);
		sheet.createRow(rowIdx++);
		fillGrandTotal(sheet.createRow(rowIdx++));
		mergeRegion(sheet,rowIdx-1,rowIdx-1,0,2);
	}
	private void mergeRegion(Sheet sheet,int firstRow,int lastRow,int firstColumn,int lastColumn) {
		sheet.addMergedRegion(new CellRangeAddress(
				firstRow, //first row (0-based)
				lastRow, //last row  (0-based)
				firstColumn, //first column (0-based)
				lastColumn  //last column  (0-based)
		));

	}
	private InputStream getInputStream(Workbook workbook) throws IOException {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		workbook.write(out);
		return new ByteArrayInputStream(out.toByteArray());
	}
	private CellStyle getCellstyle(Workbook workbook) {
		XSSFCellStyle headerCellstyle =(XSSFCellStyle) workbook.createCellStyle();
		headerCellstyle.setAlignment(HorizontalAlignment.CENTER);
		headerCellstyle.setFont (headerFont);
		try {
			byte[] rgbB = Hex.decodeHex("3333FF"); // get byte array from hex string
			XSSFColor color = new XSSFColor(rgbB, null); //IndexedColorMap has no usage until now. So it can be set null.
//			centerAlignment.setFillBackgroundColor(color);
			headerCellstyle.setFillForegroundColor(color);
			headerCellstyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		}catch (Exception e){

		}
		return headerCellstyle;
	}
	private Font setFont(Workbook workbook) {
		font = workbook.createFont();
		headerFont = workbook.createFont();
		font.setBold(true);
		headerFont.setColor(IndexedColors.WHITE.getIndex());
		return font;
	}
	private Font getFontForHeader (Workbook workbook) {
		Font font = workbook.createFont();
		font.setBold(true);
		font.setColor(IndexedColors.BLACK.getIndex());
		return font;
	}
	private void fillUserSummary (int index,Row row, UserSummary summaryReport) {
		Cell cell = row.createCell(0);
		cell.setCellValue(summaryReport.getActivated());
		cell.setCellStyle(centerAlignment);

		cell = row.createCell(1);
		cell.setCellValue(summaryReport.getMigrated());
		cell.setCellStyle(index%2==0?evenRow:oddRow);

		cell = row.createCell(2);
		cell.setCellValue(summaryReport.getFpVerified());
		cell.setCellStyle(index%2==0?evenRow:oddRow);

		cell = row.createCell(3);
		cell.setCellValue(summaryReport.getCount());
		cell.setCellStyle(centerAlignment);

	}
	private void fillGrandTotal (Row row) {
		Cell cell = row.createCell(0);
		cell.setCellValue("Grand Total");
		cell.setCellStyle(centerAlignmentWithBold);

		cell = row.createCell(3);
		cell.setCellValue(total);

		cell.setCellStyle(centerAlignmentWithBold);

	}
	private void setColumnswidth(Sheet sheet) {
		sheet.setDefaultColumnWidth(DEFAULT_COLUMN_WIDTH);
	}
	@Override
	public String getFileGeneratorType() {
		return USERS_REPORT_SUMMARY_EXCEL.getReportType();
	}
	
	



######################################END################################################################
