<!--
    3[Business Analyst] -->|If NOT Successful| Product Manager=Business Analyst

    3[Business Analyst] -->|Wireframing| 4[UI/UX Engineer]
    4[UI/UX Engineer] -->|User Validation| G[UI/UX Engineer]
    4[UI/UX Engineer] -->|If Successful| 4[UI/UX Engineer]
    4[UI/UX Engineer] -->|If NOT Successful| F

    H -->|UI Design Review| I[UI/UX Engineer]
    I -->|If Accepted| J[Technical Design]
    I -->|If NOT Accepted| H

    J -->|Technical Design Review| K[Tech Lead]
    K -->|If Accepted| L[Test Design]
    K -->|If NOT Accepted| J

    L -->|Test Design Review| M[QA Lead]
    M -->|If Accepted| N[Test Cases]
    M -->|If NOT Accepted| L

    N -->|Test Cases Review with UACs| O[Business Analyst]
    O -->|If Accepted| P[POC]
    O -->|If NOT Accepted| N

    P -->|Implementation| Q[Software Engineer]
    Q -->|Unit Testing| R[Software Engineer]
    R -->|Dev Testing with Test Cases| S[Software Engineer]
    S -->|If Passed| T[Code Review]
    S -->|If NOT Passed| Q

    T -->|If Accepted| U[UI & UAC Review]
    T -->|If NOT Accepted| Q

    U -->|If Accepted| V[Raise PR]
    U -->|If NOT Accepted| Q

    V -->|PR Review| W[Tech Lead]
    W -->|If Accepted| X[PR Merged]
    W -->|If NOT Accepted| V

    X -->|QA Testing in Test Slot| Y[QA Engineer]
    Y -->|If Passed| Z[Test Automation]
    Y -->|If NOT Passed| Q

    Z -->|If Passed| AA[Push Release to Staging]
    Z -->|If NOT Passed| Q

    AA -->|Push Release to Prod| AB[DevOps Engineer]
    AB -->|End User Documentation| AC[User Education Specialist]
    AC -->|Training Video| AD[User Education Specialist]
    AD -->|Release Material| AE[User Education Specialist]
    AE -->|END| AF[Closure] -->
