# Key Request Containers ♥️ C#

This repo builds containerized microservices for the Key Request app using Blazor (.NET/C#).

to test API, OpenAPI integration with [Scalar](https://learn.microsoft.com/aspnet/core/fundamentals/openapi/using-openapi-documents?view=aspnetcore-10.0#use-scalar-for-interactive-api-documentation).

### Run Options

[![Open in GitHub Codespaces](https://img.shields.io/static/v1?style=for-the-badge&label=GitHub+Codespaces&message=Open&color=lightgrey&logo=github)](https://codespaces.new/github/dotnet-codespaces)
[![Open in Dev Container](https://img.shields.io/static/v1?style=for-the-badge&label=Dev+Container&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/github/dotnet-codespaces)

You can also run this repository locally by following these instructions: 
1. Clone the repo to your local machine `git clone https://github.com/github/dotnet-codespaces`
2. Open repo in VS Code

## Test the API and Scalar

1. **📤 One-click setup**: [Open a new Codespace](https://codespaces.new/github/dotnet-codespaces), giving you a fully configured cloud developer environment.
2. **▶️ Run all, one-click again**: Use VS Code's built-in *Run* command and open the forwarded ports *8080* and *8081* in your browser. 

![Debug menu in VS Code showing Run All](images/RunAll.png)

3. The Blazor web app and Scalar can be open by heading to **/scalar** in your browser. On Scalar, head to the backend API and click "Test Request" to call and test the API. 

![A website showing weather](images/BlazorApp.png)

!["UI showing testing an API"](images/scalar.png)


4. **🔄 Iterate quickly:** Codespaces updates the server on each save, and VS Code's debugger lets you dig into the code execution.

5. To stop running, return to VS Code, and click Stop twice in the debug toolbar. 

![VS Code stop debuggin on both backend and frontend](images/StopRun.png)

