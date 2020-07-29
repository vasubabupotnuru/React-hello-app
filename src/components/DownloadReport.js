export function downloadReport(reportData) {
    const url = "http://localhost:8080/v1/download/usersReport";
   return( fetch(url,
        {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body:JSON.stringify(reportData),
        }).then(res => {
        return res;
    })
)
}
