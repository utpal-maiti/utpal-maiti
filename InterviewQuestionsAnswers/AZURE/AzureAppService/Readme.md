# [Azure App Service & Labs](https://github.com/utpal-maiti/Azure_App_Service/)

**Azure App Service** is a fully managed platform as a service (PaaS) offering from Microsoft Azure that enables you to
build, deploy, and scale web apps, RESTful APIs, and mobile back ends. Here are some key features:

### Key Features of Azure App Service

1. **Multiple Languages and Frameworks**: Supports .NET, .NET Core, Java, Node.js, PHP, Python, and more.
2. **Managed Environment**: Automatically patches and maintains the OS and language frameworks.
3. **Containerization**: Supports Docker containers for both Windows and Linux environments.
4. **DevOps Integration**: Seamless integration with Azure DevOps, GitHub, Docker Hub, and other CI/CD tools.
5. **Scalability**: Automatically scales your app based on demand.
6. **Security**: Built-in security features like Azure Web Application Firewall, SSL/TLS support, and compliance with industry standards.
7. **Global Distribution**: Host your apps globally with high availability and low latency.
8. **Hybrid Connections**: Connect to on-premises databases and other services.

### Getting Started with Azure App Service

1. **Create an App Service**: You can create an App Service instance through the Azure portal, Azure CLI, or Azure PowerShell.
2. **Deploy Your App**: Deploy your web app, API, or mobile back end using various methods such as FTP, Git, or continuous deployment from source control.
3. **Configure Settings**: Manage your app settings, scale settings, and connection strings through the Azure portal or CLI.
4. **Monitor and Maintain**: Use Azure Monitor and Application Insights to track performance and troubleshoot issues.

Azure App Service is a fully managed platform for building, deploying, and scaling web apps. It's versatile and supports multiple programming languages, including C#. Here's an overview of key concepts for using Azure App Service with C#:

### 1. Web Apps

- **Create and Deploy**: You can create and deploy a web app directly from Visual Studio using the Azure App Service extension.
- **Frameworks**: It supports various frameworks, such as ASP.NET, .NET Core, and Node.js, enabling you to build robust web applications.

### 2. App Service Plans

- **Pricing Tiers**: Azure offers different pricing tiers based on your needs, such as Free, Shared, Basic, Standard, and Premium plans.
- **Scaling**: You can scale your app horizontally by adding more instances or vertically by increasing the resources of your existing instance.

### 3. Continuous Deployment

- **CI/CD Pipelines**: Integrate with GitHub, Azure Repos, Bitbucket, etc., to set up continuous integration and continuous deployment.
- **Deployment Slots**: Test your application in a staging environment before swapping it into production.

### 4. Monitoring and Diagnostics

- **Application Insights**: Use this tool to monitor performance, detect issues, and analyze usage patterns.
- **Logs**: Access diagnostic logs to troubleshoot errors and monitor the health of your application.

### 5. Security

- **Authentication**: Implement authentication and authorization using Azure Active Directory, OAuth, or other identity providers.
- **Networking**: Protect your app using features like IP restrictions, SSL certificates, and Virtual Networks.

### 6. Configuration and Management

- **App Settings and Connection Strings**: Store configuration settings and connection strings securely in the Azure portal.
- **Kudu Console**: Access advanced administrative features through the Kudu console, which includes a file explorer and debugging tools.

### 7. Custom Domains and SSL

- **Custom Domains**: Map custom domains to your Azure App Service application.
- **SSL/TLS**: Secure your app with SSL/TLS certificates for encrypted communication.

### Example: Deploying an ASP.NET Core App

Here's a simple example of deploying an ASP.NET Core app to Azure App Service:

1. **Create a New Project**: Open Visual Studio and create a new ASP.NET Core Web Application project.
2. **Develop Your App**: Write your code and test it locally.
3. **Publish to Azure**:

   - Right-click on your project in Solution Explorer.
   - Select "Publish" and choose "Azure".
   - Sign in to your Azure account and select your subscription.
   - Create a new Azure App Service or select an existing one.
   - Configure settings and click "Publish".

4. **Monitor and Scale**:

   - Use the Azure portal to monitor app performance.
   - Scale your app as needed based on traffic and usage.

5. Exam AZ-204: Developing Solutions for Microsoft Azure
   1. https://docs.microsoft.com/en-us/learn/certifications/exams/az-204

- Run a basic web application in Azure

  - https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/app-service-web-app/basic-web-app

- App Service pricing

  - https://azure.microsoft.com/en-us/pricing/details/app-service/windows/

- Introduction to the App Service Environments

  - https://docs.microsoft.com/en-us/azure/app-service/environment/intro

- Create App Service via Azure CLI

  - https://gist.github.com/mikepfeiffer/7a3a8d12a42ec705233ceee3f3844a35

- Azure CLI - az group create
  - https://docs.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest#az_group_create

Azure CLI - az appserviceplan create
https://docs.microsoft.com/en-us/cli/azure/appservice/plan?view=azure-cli-latest#az_appservice_plan_create

Azure CLI - az webapp create
https://docs.microsoft.com/en-us/cli/azure/webapp?view=azure-cli-latest#az_webapp_create

PowerShell samples for Azure App Service
https://docs.microsoft.com/en-us/azure/app-service/samples-powershell

Deploy a basic Linux web app - ARM Template
https://azure.microsoft.com/en-us/resources/templates/101-webapp-basic-linux/

Secure a custom DNS name with a TLS/SSL binding in Azure App Service
https://docs.microsoft.com/en-us/azure/app-service/configure-ssl-bindings

Configure an App Service app in the Azure portal
https://docs.microsoft.com/en-us/azure/app-service/configure-common

Enable diagnostics logging for apps in Azure App Service
https://docs.microsoft.com/en-us/azure/app-service/troubleshoot-diagnostic-logs

Continuous deployment to Azure App Service
https://docs.microsoft.com/en-us/azure/app-service/deploy-continuous-deployment

GitHub Demo Repo
https://github.com/mikepfeiffer/aspnetcore3.1

Azure Autoscaling
https://docs.microsoft.com/en-us/azure/architecture/best-practices/auto-scaling

Scale up an app in Azure App Service
https://docs.microsoft.com/en-us/azure/app-service/manage-scale-up

Get started with Autoscale in Azure
https://docs.microsoft.com/en-us/azure/azure-monitor/platform/autoscale-get-started?toc=/azure/app-service/toc.json
