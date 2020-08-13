CREATE TABLE "ALM_APP_INSTALLS"(
    "UUID" VARCHAR(40) NOT NULL,
    "ALM_ID" VARCHAR(40) NOT NULL,
    "OWNER_ID" VARCHAR(4000) NOT NULL,
    "INSTALL_ID" VARCHAR(4000) NOT NULL,
    "IS_OWNER_USER" BOOLEAN NOT NULL,
    "USER_EXTERNAL_ID" VARCHAR(255),
    "CREATED_AT" BIGINT NOT NULL,
    "UPDATED_AT" BIGINT NOT NULL
);
ALTER TABLE "ALM_APP_INSTALLS" ADD CONSTRAINT "PK_ALM_APP_INSTALLS" PRIMARY KEY("UUID");
CREATE UNIQUE INDEX "ALM_APP_INSTALLS_OWNER" ON "ALM_APP_INSTALLS"("ALM_ID", "OWNER_ID");
CREATE UNIQUE INDEX "ALM_APP_INSTALLS_INSTALL" ON "ALM_APP_INSTALLS"("ALM_ID", "INSTALL_ID");
CREATE INDEX "ALM_APP_INSTALLS_EXTERNAL_ID" ON "ALM_APP_INSTALLS"("USER_EXTERNAL_ID");

CREATE TABLE "USERS"(
    "UUID" VARCHAR(255) NOT NULL,
    "LOGIN" VARCHAR(255) NOT NULL,
    "ORGANIZATION_UUID" VARCHAR(40),
    "NAME" VARCHAR(200),
    "EMAIL" VARCHAR(100),
    "CRYPTED_PASSWORD" VARCHAR(100),
    "SALT" VARCHAR(40),
    "HASH_METHOD" VARCHAR(10),
    "ACTIVE" BOOLEAN DEFAULT TRUE,
    "SCM_ACCOUNTS" VARCHAR(4000),
    "EXTERNAL_LOGIN" VARCHAR(255) NOT NULL,
    "EXTERNAL_IDENTITY_PROVIDER" VARCHAR(100) NOT NULL,
    "EXTERNAL_ID" VARCHAR(255) NOT NULL,
    "IS_ROOT" BOOLEAN NOT NULL,
    "USER_LOCAL" BOOLEAN,
    "ONBOARDED" BOOLEAN NOT NULL,
    "HOMEPAGE_TYPE" VARCHAR(40),
    "HOMEPAGE_PARAMETER" VARCHAR(40),
    "LAST_CONNECTION_DATE" BIGINT,
    "CREATED_AT" BIGINT,
    "UPDATED_AT" BIGINT
);
ALTER TABLE "USERS" ADD CONSTRAINT "PK_USERS" PRIMARY KEY("UUID");
CREATE UNIQUE INDEX "USERS_LOGIN" ON "USERS"("LOGIN");
CREATE INDEX "USERS_UPDATED_AT" ON "USERS"("UPDATED_AT");
CREATE UNIQUE INDEX "UNIQ_EXTERNAL_ID" ON "USERS"("EXTERNAL_IDENTITY_PROVIDER", "EXTERNAL_ID");
CREATE UNIQUE INDEX "UNIQ_EXTERNAL_LOGIN" ON "USERS"("EXTERNAL_IDENTITY_PROVIDER", "EXTERNAL_LOGIN");

CREATE TABLE "FILE_SOURCES"(
    "PROJECT_UUID" VARCHAR(50) NOT NULL,
    "FILE_UUID" VARCHAR(50) NOT NULL,
    "LINE_HASHES" CLOB(2147483647),
    "LINE_HASHES_VERSION" INTEGER,
    "DATA_HASH" VARCHAR(50),
    "SRC_HASH" VARCHAR(50),
    "REVISION" VARCHAR(100),
    "LINE_COUNT" INTEGER NOT NULL,
    "BINARY_DATA" BLOB,
    "CREATED_AT" BIGINT NOT NULL,
    "UPDATED_AT" BIGINT NOT NULL,
    "UUID" VARCHAR(40) NOT NULL
);
ALTER TABLE "FILE_SOURCES" ADD CONSTRAINT "PK_FILE_SOURCES" PRIMARY KEY("UUID");
CREATE UNIQUE INDEX "FILE_SOURCES_FILE_UUID" ON "FILE_SOURCES"("FILE_UUID");
CREATE INDEX "FILE_SOURCES_PROJECT_UUID" ON "FILE_SOURCES"("PROJECT_UUID");
CREATE INDEX "FILE_SOURCES_UPDATED_AT" ON "FILE_SOURCES"("UPDATED_AT");

CREATE TABLE "CE_ACTIVITY"(
    "UUID" VARCHAR(40) NOT NULL,
    "TASK_TYPE" VARCHAR(15) NOT NULL,
    "MAIN_COMPONENT_UUID" VARCHAR(40),
    "COMPONENT_UUID" VARCHAR(40),
    "STATUS" VARCHAR(15) NOT NULL,
    "MAIN_IS_LAST" BOOLEAN NOT NULL,
    "MAIN_IS_LAST_KEY" VARCHAR(55) NOT NULL,
    "IS_LAST" BOOLEAN NOT NULL,
    "IS_LAST_KEY" VARCHAR(55) NOT NULL,
    "SUBMITTER_UUID" VARCHAR(255),
    "SUBMITTED_AT" BIGINT NOT NULL,
    "STARTED_AT" BIGINT,
    "EXECUTED_AT" BIGINT,
    "EXECUTION_COUNT" INTEGER NOT NULL,
    "EXECUTION_TIME_MS" BIGINT,
    "ANALYSIS_UUID" VARCHAR(50),
    "ERROR_MESSAGE" VARCHAR(1000),
    "ERROR_STACKTRACE" CLOB(2147483647),
    "ERROR_TYPE" VARCHAR(20),
    "WORKER_UUID" VARCHAR(40),
    "CREATED_AT" BIGINT NOT NULL,
    "UPDATED_AT" BIGINT NOT NULL
);
ALTER TABLE "CE_ACTIVITY" ADD CONSTRAINT "PK_CE_ACTIVITY" PRIMARY KEY("UUID");
CREATE INDEX "CE_ACTIVITY_COMPONENT" ON "CE_ACTIVITY"("COMPONENT_UUID");
CREATE INDEX "CE_ACTIVITY_ISLAST" ON "CE_ACTIVITY"("IS_LAST", "STATUS");
CREATE INDEX "CE_ACTIVITY_ISLAST_KEY" ON "CE_ACTIVITY"("IS_LAST_KEY");
CREATE INDEX "CE_ACTIVITY_MAIN_COMPONENT" ON "CE_ACTIVITY"("MAIN_COMPONENT_UUID");
CREATE INDEX "CE_ACTIVITY_MAIN_ISLAST" ON "CE_ACTIVITY"("MAIN_IS_LAST", "STATUS");
CREATE INDEX "CE_ACTIVITY_MAIN_ISLAST_KEY" ON "CE_ACTIVITY"("MAIN_IS_LAST_KEY");
CREATE UNIQUE INDEX "CE_ACTIVITY_UUID" ON "CE_ACTIVITY"("UUID");

CREATE TABLE "EVENTS"(
    "UUID" VARCHAR(40) NOT NULL,
    "ANALYSIS_UUID" VARCHAR(50) NOT NULL,
    "NAME" VARCHAR(400),
    "CATEGORY" VARCHAR(50),
    "DESCRIPTION" VARCHAR(4000),
    "EVENT_DATA" VARCHAR(4000),
    "EVENT_DATE" BIGINT NOT NULL,
    "CREATED_AT" BIGINT NOT NULL,
    "COMPONENT_UUID" VARCHAR(50) NOT NULL
);
ALTER TABLE "EVENTS" ADD CONSTRAINT "PK_EVENTS" PRIMARY KEY("UUID");
CREATE UNIQUE INDEX "EVENTS_UUID" ON "EVENTS"("UUID");
CREATE INDEX "EVENTS_ANALYSIS" ON "EVENTS"("ANALYSIS_UUID");
CREATE INDEX "EVENTS_COMPONENT_UUID" ON "EVENTS"("COMPONENT_UUID");
