# [Azure Storage & Labs](https://github.com/utpal-maiti/Azure_Storage/)

Azure Storage is a highly scalable, durable, and secure cloud storage solution for a wide range of data types, including unstructured data, structured data, and semi-structured data. Here's an in-depth look at the core concepts of Azure Storage:

### 1. **Storage Account**

- **Overview**: A storage account provides a unique namespace for your Azure Storage data, accessible via HTTP or HTTPS.
- **Types of Storage Accounts**:
  - **General-purpose v2**: Supports all Azure Storage features, including Blob, Table, Queue, and File storage.
  - **Blob Storage**: Optimized for storing large amounts of unstructured data.
  - **File Storage**: Provides fully managed file shares in the cloud.
  - **BlockBlobStorage**: Optimized for block blobs and append blobs.
  - **Premium Storage**: Offers high-performance and low-latency storage for I/O-intensive workloads.

### 2. **Blob Storage**

- **Types of Blobs**:

  - **Block Blobs**: Ideal for storing text and binary data, typically used for documents, media files, etc.
  - **Append Blobs**: Optimized for append operations, useful for logging data.
  - **Page Blobs**: Suitable for random read/write operations, often used for virtual hard disks (VHDs).

- **Blob Storage Tiers**:
  - **Hot**: For data that is accessed frequently.
  - **Cool**: For data that is infrequently accessed and stored for at least 30 days.
  - **Archive**: For data that is rarely accessed and stored for at least 180 days.

### 3. **Table Storage**

- **Overview**: Azure Table Storage is a NoSQL key-value store for structured data.
- **Schema-less Design**: Allows for flexible and scalable data structures.
- **Partitioning**: Data is partitioned to improve performance and scalability.

### 4. **Queue Storage**

- **Overview**: Provides a reliable messaging solution for asynchronous communication between application components.
- **Message Queues**: Queues can store millions of messages, each up to 64 KB in size.
- **Visibility Timeout**: Controls how long a message remains invisible to other consumers after being read.

### 5. **File Storage**

- **Overview**: Provides fully managed file shares that can be accessed via the Server Message Block (SMB) protocol.
- **File Shares**: Suitable for scenarios where applications share files across multiple instances or require persistent storage.
- **Mounting Shares**: Azure file shares can be mounted on cloud VMs, on-premises computers, and more.

### 6. **Disk Storage**

- **Overview**: Azure Disk Storage provides persistent, high-performance block storage for Azure Virtual Machines.
- **Types of Disks**:
  - **Managed Disks**: Fully managed by Azure, offering simplified scalability.
  - **Unmanaged Disks**: Managed by the user, requiring separate storage accounts.
- **Disk Types**:
  - **Standard HDD**: Cost-effective storage for less demanding workloads.
  - **Standard SSD**: Better performance and reliability than HDDs, suitable for web servers.
  - **Premium SSD**: High-performance storage for I/O-intensive workloads.

### 7. **Access and Security**

- **Role-Based Access Control (RBAC)**: Assign roles to users, groups, or applications to control access to storage resources.
- **Shared Access Signatures (SAS)**: Provide delegated, time-limited access to storage resources without exposing the account key.
- **Encryption**:
  - **Encryption at Rest**: All data is encrypted using Storage Service Encryption (SSE).
  - **Encryption in Transit**: Data is encrypted during transfer using HTTPS.

### 8. **Networking and Connectivity**

- **Virtual Network Service Endpoints**: Securely connect your storage account to Azure Virtual Networks.
- **Private Endpoints**: Use private IP addresses to access storage accounts, ensuring traffic remains within the Azure backbone network.
- **Firewall Rules**: Configure rules to allow or deny access based on IP addresses or ranges.

### 9. **Monitoring and Management**

- **Azure Monitor**: Provides comprehensive monitoring capabilities, including metrics, logs, and alerts.
- **Storage Analytics**: Enable logging and metrics for detailed insights into storage operations and performance.
- **Azure Storage Explorer**: A graphical tool to manage Azure Storage resources, including blobs, files, queues, and tables.

### Example: Creating a Blob Storage Container

Here’s how to create a Blob Storage container using C# and the Azure.Storage.Blobs library:

1. **Install the Azure.Storage.Blobs NuGet Package**:

   ```bash
   dotnet add package Azure.Storage.Blobs
   ```

2. **Create a Blob Container**:

   ```csharp
   using System;
   using Azure.Storage.Blobs;

   class Program
   {
       static void Main()
       {
           string connectionString = "YourConnectionString";
           string containerName = "mycontainer";

           BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);
           BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);

           containerClient.CreateIfNotExists();
           Console.WriteLine($"Created container: {containerName}");
       }
   }
   ```

### Conclusion

By understanding these core concepts of Azure Storage, you can effectively design and manage your storage solutions in the cloud.
