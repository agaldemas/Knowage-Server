INSERT into SBI_DOMAINS (VALUE_ID, VALUE_CD, VALUE_NM, DOMAIN_CD, DOMAIN_NM,VALUE_DS, USER_IN) values ((SELECT next_val FROM hibernate_sequences WHERE sequence_name = 'SBI_DOMAINS'), 'Date', 'Date', 'DS_META_VALUE', 'Dataset Metadata Value', 'Dataset Metadata Value', '');
UPDATE hibernate_sequences SET next_val = (SELECT MAX(VALUE_ID) + 1 FROM SBI_DOMAINS) WHERE sequence_name = 'SBI_DOMAINS';

UPDATE SBI_FEDERATION_DEFINITION SET NAME = LABEL WHERE NAME IS NULL;
ALTER TABLE SBI_FEDERATION_DEFINITION ALTER COLUMN  NAME VARCHAR(100) NOT NULL;

ALTER TABLE SBI_EXT_ROLES ADD COLUMN IS_PUBLIC BOOLEAN NULL;

ALTER TABLE SBI_DATA_SOURCE ADD COLUMN JDBC_ADVANCED_CONFIGURATION VARCHAR(4000);

INSERT into SBI_DOMAINS (VALUE_ID, VALUE_CD, VALUE_NM, DOMAIN_CD, DOMAIN_NM,VALUE_DS, USER_IN) values ((SELECT next_val FROM hibernate_sequences WHERE sequence_name = 'SBI_DOMAINS'), 'Solr', 'SbiSolrDataSet', 'DATA_SET_TYPE', 'Data Set Type', 'SbiSolrDataSet', '');
UPDATE hibernate_sequences SET next_val = (SELECT MAX(VALUE_ID) + 1 FROM SBI_DOMAINS) WHERE sequence_name = 'SBI_DOMAINS';

DELETE FROM SBI_PRODUCT_TYPE_ENGINE WHERE ENGINE_ID = (
    SELECT ENGINE_ID FROM SBI_ENGINES WHERE BIOBJ_TYPE = (
        SELECT VALUE_ID FROM SBI_DOMAINS WHERE DOMAIN_CD = 'BIOBJ_TYPE' AND VALUE_CD = 'ACCESSIBLE_HTML'
    )
);
 
DELETE FROM SBI_ENGINES WHERE BIOBJ_TYPE = (
    SELECT VALUE_ID FROM SBI_DOMAINS WHERE DOMAIN_CD = 'BIOBJ_TYPE' AND VALUE_CD = 'ACCESSIBLE_HTML'
);
 
DELETE FROM SBI_DOMAINS WHERE DOMAIN_CD = 'BIOBJ_TYPE' AND VALUE_CD = 'ACCESSIBLE_HTML';

ALTER TABLE SBI_ATTRIBUTE ALTER COLUMN DESCRIPTION VARCHAR(500) NULL;
