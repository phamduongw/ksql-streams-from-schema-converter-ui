import { createSlice } from '@reduxjs/toolkit';

// Slice
const converterSlice = createSlice({
  name: 'converter',
  initialState: {
    procName: '',
    schemaName: '',
    procType: 'xml',
    blobDelimiter: '',
    etlData: [],
    sqlStatement: `\
-- raw/ogg stream
CREATE STREAM ACCOUNT (
    \`TABLE\` STRING,
    SCN STRING,
    OP_TYPE STRING,
    OP_TS STRING,
    CURRENT_TS STRING,
    ROWKEY STRING KEY,
    LOOKUP_KEY STRING,
    BEFORE STRUCT < RECID STRING, XMLRECORD STRING >,
    AFTER STRUCT < RECID STRING, XMLRECORD STRING >
) 
WITH (KAFKA_TOPIC = 'ACCOUNT', VALUE_FORMAT='AVRO');
-- parse xml stream 
CREATE OR REPLACE STREAM ACCOUNT_MAPPED AS
SELECT
    AS_VALUE(DATA.ROWKEY) RECID,
    DATA.ROWKEY ROWKEY,
    DATA.LOOKUP_KEY LOOKUP_KEY,
    DATA.OP_TS OP_TS,
    DATA.CURRENT_TS REP_TS,
    DATA.\`TABLE\` TABLE_NAME,
    CAST(DATA.SCN AS BIGINT) COMMIT_SCN,
    DATA.OP_TYPE COMMIT_ACTION,
    PARSE_TIMESTAMP(
        TIMESTAMPTOSTRING(DATA.ROWTIME, 'yyyy-MM-dd HH:mm:ss.SSS'),
        'yyyy-MM-dd HH:mm:ss.SSS'
    ) CURRENT_TS,
    (
        CASE
            WHEN (DATA.OP_TYPE = 'D') THEN PARSE_T24_RECORD(
                DATA.BEFORE -> XMLRECORD,
                'T24SS_ACCOUNT-value',
                '#'
            )
            ELSE PARSE_T24_RECORD(
                DATA.AFTER -> XMLRECORD,
                'T24SS_ACCOUNT-value',
                '#'
            )
        END
    ) XMLRECORD
FROM ACCOUNT EMIT CHANGES;
-- sink/final stream 
CREATE OR REPLACE 
STREAM ACCOUNT AS
SELECT
    ROWKEY ROWKEY,
    OP_TS OP_TS,
    REP_TS REP_TS,
    PARSE_TIMESTAMP(OP_TS, 'yyyy-MM-dd HH:mm:ss.SSSSSS') COMMIT_TS,
    PARSE_TIMESTAMP(
        TIMESTAMPTOSTRING(ROWTIME, 'yyyy-MM-dd HH:mm:ss.SSS'),
        'yyyy-MM-dd HH:mm:ss.SSS'
    ) STREAM_TS,
    PARSE_TIMESTAMP(REP_TS, 'yyyy-MM-dd HH:mm:ss.SSSSSS') REPLICAT_TS,
    RECID RECID,
    TABLE_NAME TABLE_NAME,
    COMMIT_SCN COMMIT_SCN,
    COMMIT_ACTION COMMIT_ACTION,
    LOOKUP_KEY LOOKUP_KEY,
  CASE
        WHEN SCP.IS_COB_COMPLETED = TRUE
        AND DATA.COMMIT_SCN < SCP.COMMIT_SCN THEN PARSE_DATE(SCP.LAST_WORKING_DAY, 'yyyyMMdd')
        WHEN SCP.IS_COB_COMPLETED = FALSE
        AND DATA.COMMIT_SCN < SCP.COMMIT_SCN THEN PARSE_DATE(SCP.LAST_WORKING_DAY, 'yyyyMMdd')
        ELSE PARSE_DATE(SCP.TODAY, 'yyyyMMdd')
    END AS BANKING_DATE,
  XMLRECORD['CUSTOMER'] as CUSTOMER,
XMLRECORD['CATEGORY'] as CATEGORY,
XMLRECORD['ACCOUNT_TITLE_1'] as ACCOUNT_TITLE_1,
XMLRECORD['VN_ACCOUNT_TITLE_1'] as VN_ACCOUNT_TITLE_1,
XMLRECORD['ACCOUNT_TITLE_2'] as ACCOUNT_TITLE_2,
XMLRECORD['VN_ACCOUNT_TITLE_2'] as VN_ACCOUNT_TITLE_2,
XMLRECORD['SHORT_TITLE'] as SHORT_TITLE,
XMLRECORD['MNEMONIC'] as MNEMONIC,
XMLRECORD['POSITION_TYPE'] as POSITION_TYPE,
XMLRECORD['CURRENCY'] as CURRENCY,
XMLRECORD['CURRENCY_MARKET'] as CURRENCY_MARKET,
XMLRECORD['LIMIT_REF'] as LIMIT_REF,
XMLRECORD['ACCOUNT_OFFICER'] as ACCOUNT_OFFICER,
XMLRECORD['OTHER_OFFICER'] as OTHER_OFFICER,
XMLRECORD['POSTING_RESTRICT'] as POSTING_RESTRICT,
XMLRECORD['RECONCILE_ACCT'] as RECONCILE_ACCT,
XMLRECORD['INTEREST_LIQU_ACCT'] as INTEREST_LIQU_ACCT,
XMLRECORD['INTEREST_COMP_ACCT'] as INTEREST_COMP_ACCT,
XMLRECORD['INT_NO_BOOKING'] as INT_NO_BOOKING
  FROM
    ACCOUNT_MAPPED DATA
    INNER JOIN SEAB_COB_PROCESS SCP ON (SCP.RECID = DATA.LOOKUP_KEY)
  PARTITION BY DATA.ROWKEY
  EMIT CHANGES;`,
  },
  reducers: {
    setProcName: (state, action) => {
      state.procName = action.payload;
    },
    setSchemaName: (state, action) => {
      state.schemaName = action.payload;
    },
    setProcType: (state, action) => {
      state.procType = action.payload;
    },
    setBlobDelimiter: (state, action) => {
      state.blobDelimiter = action.payload;
    },
    setEtlData: (state, action) => {
      state.etlData = action.payload;
    },
    setSqlStatement: (state, action) => {
      state.sqlStatement = action.payload;
    },
  },
});

// Action
export const {
  setProcName,
  setSchemaName,
  setProcType,
  setBlobDelimiter,
  setEtlData,
  setSqlStatement,
} = converterSlice.actions;

// Selector
export const procNameSelector = (state) => state.converter.procName;
export const schemaNameSelector = (state) => state.converter.schemaName;
export const procTypeSelector = (state) => state.converter.procType;
export const blobDelimiterSelector = (state) => state.converter.blobDelimiter;
export const etlDataSelector = (state) => state.converter.etlData;
export const sqlStatementSelector = (state) => state.converter.sqlStatement;

// Reducer
export default converterSlice.reducer;
