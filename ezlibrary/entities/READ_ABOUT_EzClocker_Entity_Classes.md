# EzClocker Entity JS Classes
This document will provide information on using, creating, and extended EzClocker's Javascript entity classes. Below you will find the list of available topics.

- EzClocker Entity JS Class Definition
- Source Folders for EzClocker Entity JS Classes
- When Should I Use an Existing EzClocker Entity JS Class?
- Using an Existing EzClocker Entity JS Class
- When Should I Create a New EzClocker Entity JS Class?
- Creating a New EzClocker Entity JS Class
- When Should I Extend an Existing EzClocker Entity JS Class?
- Extending an Existing EzClocker Entity JS Class

## EzClocker Entity JS Class Definition

Time to learn more about EzClocker's Entity JS Classes!

In general, a Entity is a collection of attributes that relate to a specific thing (such as a Cat). All attributes in an Entity must have a direct relationship to the thing thing the Entity represents. Using a cat as
an example, a Cat Entity would have some of the following attributes: color, weight, and age. A Cat Entity would not have an attribute such as 'tirePressure' as that attribute does not relate at all to a cat.

An EzClocker JS Entity Class is a Javascript class the represents a collection of related items (data or other classes). The most common EzClocker JS Entity Class is a Javascript class that
represents a record from a database table. However, entity classes can also represent a lot of other things overall::

- The payload an HTTP requests
- The response from an HTTP request
- Configuration data for a dialog
- Meta data associated with another class or action.

### Example EzClocker JS Entity Class

An nice example of an existing EzClocker JS Entity class is the EzDataTag entity (src/main/website/ezlibrary/entities/EzDataTag.js). The EzDataTag entity represents a single record from the
EzClocker's data_tag database table. In addition, the EzDataTag JS Entity is the Javascript equivalent of the Java Entity class EzDataTag (src/main/java/com/ezclocker/domain/entities/EzDataTag.js)
and closely matches the Java implementation.

## Source Folders for EzClocker Entity JS Classes

The code separates different categories of EzClocker JS Entity classes based upon the thing they represent. The list below contains each sub-folder of the src/main/website/ezlibrary/entities main folder
and a description of what type of JS Entity classes it contains.

### Entities Root

    Location: src/main/website/ezlibrary/entities

The root entities folder will contain the majority of the EzClocker JS Entity classes. This includes the following entity types:

- Represents a DB table record
- Is the JS implementation equivalent to a Java entity classes
- Represents a set of related data (such as dialog configurations, or meta data for classes and actions)

### Request Entities

    Location: src/main/website/ezlibrary/entities/requests

The requests folder contains entities that represent the payload of an HTTP request.

### Response Entities

    Location: src/main/website/ezlibrary/entities/responses

The responses folder contains entities that represent a response from a HTTP request.

## When Should I Use an Existing EzClocker Entity JS Class?

*content not yet available :(*

## Using an Existing EzClocker Entity JS Class

*content not yet available :(*

## When Should I Create a New EzClocker Entity JS Class?

*content not yet available :(*

## Creating a New EzClocker Entity JS Class

*content not yet available :(*

## When Should I Extend an Existing EzClocker Entity JS Class?

*content not yet available :(*

## Extending an Existing EzClocker Entity JS Class

*content not yet available :(*
