# [Azure Event Grid & Labs](https://github.com/utpal-maiti/Azure_Event_Grid/) 

Azure Event Grid is a highly scalable, fully managed event routing service that enables you to build event-driven architectures. Here are some of its key features:

### **Key Features of Azure Event Grid:**

1. **Real-Time Event Delivery**: Events are delivered to subscribers as soon as they are published.
2. **Serverless Integration**: Seamlessly integrates with Azure services like Azure Functions, Logic Apps, and more.
3. **Highly Scalable**: Handles millions of events per second while maintaining low latency.
4. **Flexible Messaging Patterns**: Supports one-to-many, many-to-one, and one-to-one messaging patterns.
5. **MQTT Support**: Supports MQTT v3.1.1 and v5.0 protocols for IoT solutions.
6. **Custom Topics with Wildcards**: Allows for custom topic structures and supports wildcards.
7. **Built-in Cloud Integration**: Routes events to Azure services or custom webhooks for further processing.
8. **Fine-Grained Access Control**: Provides flexible and fine-grained access control models.
9. **High Availability**: Natively deployed across multiple fault domains and availability zones.
10. **Push and Pull Delivery**: Supports both push and pull delivery modes for event consumption.


Azure Event Grid is a fully managed event routing service that enables you to build event-driven architectures. Here are some key concepts to understand:

### **Key Concepts of Azure Event Grid:**

1. **Events**: An event is the smallest unit of information that describes something that happened in a system in Event Grid basic - Azure Event Grid](https://learn.microsoft.com/en-us/azure/event-grid/concepts). Every event has common information like the source, time, and a unique identifier, as well as specific information relevant to the event type in Event Grid basic - Azure Event Grid](https://learn.microsoft.com/en-us/azure/event-grid/concepts).

2. **Event Sources**: These are the places where events originate in Event Grid basic - Azure Event Grid](https://learn.microsoft.com/en-us/azure/event-grid/concepts). Examples include Azure services like Blob Storage, IoT Hub, or custom applications in Event Grid basic - Azure Event Grid](https://learn.microsoft.com/en-us/azure/event-grid/concepts).

3. **Publishers**: These are applications or services that send events to Event Grid in Event Grid basic - Azure Event Grid](https://learn.microsoft.com/en-us/azure/event-grid/concepts). They can be Azure services or custom applications in Event Grid basic - Azure Event Grid](https://learn.microsoft.com/en-us/azure/event-grid/concepts).

4. **Subscribers**: These are applications or services that receive and process events from Event Grid in Event Grid basic - Azure Event Grid](https://learn.microsoft.com/en-us/azure/event-grid/concepts). Subscribers can use push or pull delivery modes to receive events in Event Grid basic - Azure Event Grid](https://learn.microsoft.com/en-us/azure/event-grid/concepts).

5. **Topics**: Event Grid uses topics to route events to subscribers in Event Grid basic - Azure Event Grid](https://learn.microsoft.com/en-us/azure/event-grid/concepts). Topics can be custom and support wildcards for flexible routing in Event Grid basic - Azure Event Grid](https://learn.microsoft.com/en-us/azure/event-grid/concepts).

6. **CloudEvents**: Event Grid supports the CloudEvents specification, which is an open standard for describing events in Event Grid basic - Azure Event Grid](https://learn.microsoft.com/en-us/azure/event-grid/concepts). This improves interoperability and provides a common format for event data in Event Grid basic - Azure Event Grid](https://learn.microsoft.com/en-us/azure/event-grid/concepts).

7. **Namespace Topics**: With namespaces, you can group related resources and manage them as a single unit. Namespaces provide a unique fully qualified domain name (FQDN) and expose endpoints for event delivery.

8. **Delivery Modes**: Event Grid supports both push and pull delivery modes. Push delivery sends events to subscribers as they are published, while pull delivery allows subscribers to fetch events from Event Grid.
