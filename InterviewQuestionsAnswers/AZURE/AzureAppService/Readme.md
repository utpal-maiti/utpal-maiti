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

**Exam AZ-204: Developing Solutions for Microsoft Azure**
**Learning Resources**

- **Microsoft Official Learning Path:** [AZ-204: Developing Solutions for Microsoft Azure](https://docs.microsoft.com/en-us/learn/certifications/exams/az-204)

**Running a Basic Web Application in Azure**

- **Microsoft Docs - Create a basic web app in Azure App Service:** [Create a basic web app in Azure App Service](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/app-service-web-app/basic-web-app)

**App Service Pricing**

- **Microsoft Azure Pricing - App Service/Windows:** [App Service pricing details](https://azure.microsoft.com/en-us/pricing/details/app-service/windows/)

**Introduction to the App Service Environments**

- **Microsoft Docs - Introduction to App Service environments:** [Introduction to App Service environments](https://docs.microsoft.com/en-us/azure/app-service/environment/intro)

**Creating an App Service via Azure CLI**

- **GitHub Gist - Create an App Service plan, web app, and deploy code using Azure CLI:** [Create an App Service plan, web app, and deploy code using Azure CLI](https://gist.github.com/mikepfeiffer/7a3a8d12a42ec705233ceee3f3844a35)
  - The gist includes instructions on using the following Azure CLI commands:
    - `az group create` ([Link to az group create docs](https://docs.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest#az_group_create))
    - `az appserviceplan create` ([Link to az appserviceplan create docs](https://docs.microsoft.com/en-us/cli/azure/appservice/plan?view=azure-cli-latest#az_appservice_plan_create))
    - `az webapp create` ([Link to az webapp create docs](https://docs.microsoft.com/en-us/cli/azure/webapp?view=azure-cli-latest#az_webapp_create))

**PowerShell Samples for Azure App Service**

- **Microsoft Docs - PowerShell samples for Azure App Service:** [PowerShell samples for Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/samples-powershell)

**Deploying a Basic Linux Web App with ARM Template**

- **Microsoft Azure - Deploy a basic Linux web app - ARM Template:** [Deploy a basic Linux web app to Azure App Service using an ARM template](https://azure.microsoft.com/en-us/resources/templates/101-webapp-basic-linux/)

**Securing a Custom DNS Name with TLS/SSL Binding in Azure App Service**

- **Microsoft Docs - Secure a custom DNS name with a TLS/SSL binding in Azure App Service:** [How to secure a custom DNS name with a TLS/SSL binding in Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/configure-ssl-bindings)

**Configuring an App Service App in the Azure Portal**

- **Microsoft Docs - Configure an App Service app in the Azure portal:** [Configure a web app in Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/configure-common)

**Enabling Diagnostics Logging for Apps in Azure App Service**

- **Microsoft Docs - Enable diagnostics logging for apps in Azure App Service:** [Troubleshoot web app problems in Azure App Service using diagnostic logs](https://docs.microsoft.com/en-us/azure/app-service/troubleshoot-diagnostic-logs)

**Continuous Deployment to Azure App Service**

- **Microsoft Docs - Continuous deployment to Azure App Service:** [Continuously deploy web apps to Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/deploy-continuous-deployment)

**Additional Resources**

- **GitHub Demo Repo - ASP.NET Core 3.1 web app on Azure App Service:** [GitHub Demo Repo - ASP.NET Core 3.1 web app on Azure App Service](https://github.com/mikepfeiffer/aspnetcore3.1)

**Azure Autoscaling**

- **Microsoft Docs - Autoscaling in Azure App Service:** [Best practices for autoscaling in Azure App Service](https://docs.microsoft.com/en-us/azure/architecture/best-practices/auto-scaling)

Below is a **concise, interview‑ready gist of Azure App Service** from a **.NET developer’s perspective**. You can skim this before interviews or use it as talking points.

***

## Azure App Service — .NET Developer Interview Gist

### What is Azure App Service?

Azure App Service is a **PaaS (Platform as a Service)** for hosting **web apps, REST APIs, mobile backends, and background jobs** without managing servers.

Supports:

*   **ASP.NET / ASP.NET Core**
*   **.NET (Windows & Linux)**
*   Java, Node.js, Python, PHP

***

## Key Components

*   **Web App** – Host ASP.NET / ASP.NET Core apps
*   **App Service Plan** – Defines **CPU, memory, scaling, OS**
*   **Deployment Slot** – Staging environments (Dev, QA, Prod)
*   **Kudu** – SCM site for diagnostics & file access

***

## App Service Plan (Very Important in Interviews)

Defines **how your app runs**, not what your app is.

| Tier          | Use Case          |
| ------------- | ----------------- |
| Free / Shared | Dev & Testing     |
| Basic (B)     | Small workloads   |
| Standard (S)  | Auto-scale, slots |
| Premium (P)   | High performance  |
| Isolated      | Dedicated VNET    |

✅ **Multiple apps can share one plan**  
❌ Scaling plan scales **all apps together**

***

## Scaling

### Vertical Scaling (Scale Up)

*   Change pricing tier (CPU/RAM)
*   Requires **restart**

### Horizontal Scaling (Scale Out)

*   Increase instances
*   **Auto-scale rules**
    *   CPU %
    *   Memory
    *   HTTP Queue Length
    *   Schedule-based scaling

👉 *App Service Load Balancer handles traffic automatically*

***

## Deployment Options (Common .NET Interview Topic)

*   **GitHub Actions**
*   **Azure DevOps Pipelines**
*   **Zip Deploy**
*   **FTP**
*   **Visual Studio Publish**
*   **Container-based deployment**

✅ Supports **CI/CD natively**

***

## Deployment Slots

Useful for:

*   Zero‑downtime deployments
*   Blue–Green deployments

Features:

*   Swap slots (staging → production)
*   Slot-specific settings (connection strings, app settings)

⚠️ Cold start avoided when swapping

***

## Configuration & Secrets

*   **App Settings** → `IConfiguration`
*   **Connection Strings** → Auto injected
*   **Azure Key Vault Integration**
*   Environment-based configs (`ASPNETCORE_ENVIRONMENT`)

Example:

```csharp
var conn = builder.Configuration.GetConnectionString("DB");
```

***

## Authentication & Authorization

Built-in **Authentication / Authorization (Easy Auth)**:

*   Azure AD
*   Microsoft Entra ID
*   Google, Facebook, Twitter
*   Custom OpenID Connect

✅ No code required (can still use ASP.NET Identity)

***

## Networking

*   VNET Integration
*   Private Endpoints
*   IP Restrictions
*   Hybrid connections (on-prem)

***

## Monitoring & Diagnostics

*   **Application Insights**
    *   Requests, dependencies, exceptions
    *   Live Metrics
*   Log Streaming
*   Kudu diagnostics
*   Health Check endpoint

***

## Security Best Practices

*   HTTPS only
*   Managed Identity
*   Key Vault for secrets
*   Disable FTP (use FTPS)
*   IP restrictions
*   Always On enabled

***

## Managed Identity (Very Likely Interview Question)

System-assigned identity allows:

*   Secure access to Azure SQL
*   Key Vault
*   Blob Storage

✅ No credentials in code

Example:

```csharp
var credential = new DefaultAzureCredential();
```

***

## Linux vs Windows App Service

| Feature             | Windows | Linux |
| ------------------- | ------- | ----- |
| Full .NET Framework | ✅       | ❌     |
| .NET Core           | ✅       | ✅     |
| Containers          | ✅       | ✅     |
| Startup Command     | ❌       | ✅     |

***

## Common App Service Interview Scenarios

✅ Hosting ASP.NET Core API  
✅ Zero downtime deployment  
✅ Scaling under traffic  
✅ Secure secret management  
✅ Logging & monitoring  
✅ Connecting to Azure SQL / Cosmos DB

***

## Limitations (Good to Mention)

*   No RDP access
*   File system is **ephemeral**
*   Cold starts (especially in low tiers)
*   Not ideal for long-running background jobs

(Use **Azure Functions / WebJobs** instead)

***

## App Service vs Azure Functions (Quick Compare)

| App Service    | Functions                  |
| -------------- | -------------------------- |
| Always running | Event-driven               |
| Stateful APIs  | Serverless                 |
| More control   | Cheaper for sporadic loads |

***

## One‑Line Interview Summary

> *Azure App Service is a managed PaaS offering that lets .NET developers deploy, scale, monitor, and secure web applications without managing infrastructure.*

***

If you want, I can also provide:

*   🔥 **Top 20 Azure App Service interview questions**
*   🧠 **Real project architecture using App Service**
*   ✅ **Sample system design answer**
*   📄 **Printable PDF cheatsheet**

Just tell me.
Great — here’s a **complete, interview‑ready package** for **Azure App Service as a .NET Developer**, covering **questions, architecture, and a system‑design answer** you can reuse almost verbatim.

***

# ✅ 1️⃣ Top 20 Azure App Service Interview Questions (with Crisp Answers)

### 1. What is Azure App Service?

A fully managed **PaaS** to host web apps, REST APIs, and backends without managing servers.

***

### 2. Difference between App Service and App Service Plan?

*   **App Service** → Your application
*   **App Service Plan** → CPU, RAM, OS, scaling

***

### 3. Can multiple apps use one App Service Plan?

✅ Yes – they **share compute resources**

***

### 4. How does scaling work?

*   **Scale up**: Change pricing tier
*   **Scale out**: Increase instances (manual or auto‑scale)

***

### 5. What is Auto‑Scale based on?

*   CPU
*   Memory
*   HTTP Queue Length
*   Schedule

***

### 6. What are Deployment Slots?

Separate environments (Staging, QA, Prod) that allow **zero‑downtime swaps**.

***

### 7. How do you achieve zero‑downtime deployment?

Using **deployment slots + slot swapping**.

***

### 8. How are secrets managed?

*   App Settings
*   Azure Key Vault
*   Managed Identity (preferred)

***

### 9. What is Managed Identity?

An Azure-provided identity that allows secure access to resources **without credentials**.

***

### 10. How do you monitor App Service?

Using **Application Insights**, log streaming, and Kudu diagnostics.

***

### 11. Difference between Windows and Linux App Service?

*   Windows: Supports full .NET Framework
*   Linux: Better for containers & startup commands

***

### 12. How to secure an App Service?

*   HTTPS only
*   Authentication / Authorization
*   Managed Identity
*   IP restrictions

***

### 13. How do app settings map to .NET?

They are injected into `IConfiguration`.

***

### 14. What is Kudu?

SCM endpoint for debugging, logs, and file browsing.

***

### 15. File system persistence?

❌ Not persistent; use Blob Storage.

***

### 16. Cold start issue?

Occurs in low tiers or when idle; mitigated using **Always On**.

***

### 17. Can App Service access on‑prem resources?

✅ Yes, via Hybrid Connections or VPN.

***

### 18. CI/CD options?

GitHub Actions, Azure DevOps, Zip Deploy, Visual Studio.

***

### 19. When not to use App Service?

For long‑running background jobs or heavy batch processing.

***

### 20. App Service vs Azure Functions?

| App Service      | Functions     |
| ---------------- | ------------- |
| Always-on apps   | Event-driven  |
| APIs / MVC       | Serverless    |
| Predictable load | Sporadic load |

***

# ✅ 2️⃣ Real‑World Architecture Using Azure App Service (.NET)

### ✅ Scenario

**E‑commerce REST API with high availability**

### 🏗 Architecture Components

    Client (Web / Mobile)
            |
    Azure Front Door
            |
    Azure App Service (ASP.NET Core API)
            |
    -----------------------------
    | Azure SQL DB             |
    | Azure Blob Storage       |
    | Azure Redis Cache        |
    -----------------------------
            |
    Application Insights

***

### Key Design Decisions

*   **App Service (Premium Plan)** → Auto‑scaling
*   **Deployment Slots** → Zero downtime
*   **Azure SQL with Managed Identity**
*   **Redis for performance**
*   **Blob Storage for images**
*   **Key Vault for secrets**

***

### Sample Code (Managed Identity – SQL)

```csharp
var tokenCredential = new DefaultAzureCredential();
```

***

# ✅ 3️⃣ System Design Interview Answer (App Service Focus)

### ❓ Question

> Design a scalable .NET API using Azure App Service for 1M daily users

***

### ✅ Step‑by‑Step Answer

**1️⃣ Compute**

*   Azure App Service (Premium Plan)
*   Auto‑scale based on CPU & requests

**2️⃣ Deployment**

*   CI/CD via GitHub Actions
*   Blue‑Green deployment using slots

**3️⃣ Database**

*   Azure SQL with read replicas
*   Managed Identity authentication

**4️⃣ Caching**

*   Azure Redis Cache for product & user sessions

**5️⃣ Security**

*   HTTPS only
*   Azure AD authentication
*   Key Vault secrets
*   IP restrictions

**6️⃣ Monitoring**

*   Application Insights
*   Health checks enabled

***

### ✅ Final Interview One‑Liner

> *This design ensures high availability, zero downtime deployments, horizontal scalability, and secure secret management while minimizing operational overhead.*

***

# ✅ 4️⃣ 30‑Second Azure App Service Elevator Pitch

Use this if interviewer says: *“Explain Azure App Service briefly.”*

> *Azure App Service is a fully managed PaaS that allows .NET developers to deploy, scale, secure, and monitor web apps and APIs without managing servers, with built‑in CI/CD, auto‑scaling, monitoring, and enterprise‑grade security.*

***

## ✅ What I Can Give Next (Pick Any)

*   📄 **Printable PDF Cheatsheet**
*   🧠 **Azure App Service vs AKS vs Functions (Interview Matrix)**
*   ❌ **Common Mistakes Candidates Make**
*   🔥 **Advanced Scenarios (Multi‑tenant, High Traffic)**

Just tell me what you want next.

