"use strict";
const pool = require("../../config/database");
let getBusinessCode = async function(t) {
    let o;
    try {
        o = await pool.getConnection();
        let e = `select code_id, b.name ,b.code from (SELECT *  FROM users_with_role) a INNER JOIN business_code b ON a.code_id = b.id WHERE user_id=${t};`;
        let a = await o.query(e);
        return {
            code: 1,
            codeResult: a
        }
    } catch (e) {
        console.log(e);
        return "응답이 없습니다. 새로고침 후 다시 시도하시기 바랍니다."
    } finally {
        if (o) {
            o.release()
        }
    }
};
let deviceInfo = async function(t) {
    let o;
    try {
        o = await pool.getConnection();
        let e = `SELECT LEFT(tagname,6) AS tagname , device_description, location_main FROM webaccess_tags a WHERE company_id = ${t} and energy_conversion_factors = 33 GROUP BY LEFT(tagname,6),location_main , device_description;`;
        let a = await o.query(e);
        delete a.meta;
        return a
    } catch (e) {
        console.log(e);
        return "응답이 없습니다. 새로고침 후 다시 시도하시기 바랍니다."
    } finally {
        if (o) {
            o.release()
        }
    }
};
let compressData = async function(t) {
    let o;
    try {
        o = await pool.getConnection();
        let e = `SELECT * FROM webaccess_tags WHERE tagname like '${t}%' AND energy_conversion_factors = 33;`;
        let a = await o.query(e);
        delete a.meta;
        return a
    } catch (e) {
        console.log(e);
        return "응답이 없습니다. 새로고침 후 다시 시도하시기 바랍니다."
    } finally {
        if (o) {
            o.release()
        }
    }
};
let getCompany = async function(t) {
    let o;
    try {
        o = await pool.getConnection();
        let e = `select id, NAME FROM company WHERE id = ${t};`;
        let a = await o.query(e);
        return {
            code: 1,
            result: a
        }
    } catch (e) {
        return {
            code: 0,
            message: "응답이 없습니다. 새로고침 후 다시 시도하시기 바랍니다."
        }
    } finally {
        if (o) {
            o.release()
        }
    }
};
let getKwh = async function(n, m) {
    let c;
    try {
        c = await pool.getConnection();
        let e;
        let a;
        let t;
        let o;
        if (m === 1) {
            e = `select sql_no_cache DATE_FORMAT(b.LogDateTime, '%Y%m')  'month' ,a.TagName ,sum(a.LastValue - b.LastValue) v from (select * from bwanalogtable where tagname IN ( SELECT distinct(concat(LEFT(tagname,6),'_kWh*05M')) AS tagname FROM webaccess_tags WHERE energy_conversion_factors = 28) ) a join bwanalogtable b on b.TagName=a.TagName AND b.LogDateTime = DATE_SUB(a.LogDateTime,interval 5 minute) WHERE b.LogDateTime < STR_TO_DATE(CONCAT(DATE_FORMAT(NOW() + INTERVAL 1 MONTH, '%Y-%m-'), '01'), '%Y-%m-%d') and b.LogDateTime > STR_TO_DATE(CONCAT(DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-'), '31'), '%Y-%m-%d') group by \`month\`;`;
            a = await c.query(e);
            t = `   select sql_no_cache DATE_FORMAT(b.LogDateTime, '%Y%m')  'month' ,a.TagName ,sum(a.LastValue - b.LastValue) v from (select * from bwanalogtable where tagname IN ( SELECT distinct(concat(LEFT(tagname,6),'_kWh*05M')) AS tagname FROM webaccess_tags WHERE energy_conversion_factors = 28) ) a join bwanalogtable b on b.TagName=a.TagName AND b.LogDateTime = DATE_SUB(a.LogDateTime,interval 5 minute) WHERE b.LogDateTime < STR_TO_DATE(CONCAT(DATE_FORMAT(NOW(), '%Y-%m-'), '01'), '%Y-%m-%d') and b.LogDateTime > STR_TO_DATE(CONCAT(DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-'), '31'), '%Y-%m-%d') group by \`month\`;`;
            o = await c.query(t)
        } else {
            e = `select sql_no_cache DATE_FORMAT(b.LogDateTime, '%Y%m')  'month' ,a.TagName ,sum(a.LastValue - b.LastValue) v from (select * from bwanalogtable where tagname IN ( SELECT distinct(concat(LEFT(tagname,6),'_kWh*05M')) AS tagname FROM webaccess_tags WHERE company_id = ${n} and energy_conversion_factors = 28) ) a join bwanalogtable b on b.TagName=a.TagName AND b.LogDateTime = DATE_SUB(a.LogDateTime,interval 5 minute) WHERE b.LogDateTime < STR_TO_DATE(CONCAT(DATE_FORMAT(NOW() + INTERVAL 1 MONTH, '%Y-%m-'), '01'), '%Y-%m-%d') and b.LogDateTime > STR_TO_DATE(CONCAT(DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-'), '31'), '%Y-%m-%d') group by \`month\`;`;
            a = await c.query(e);
            t = `   select sql_no_cache DATE_FORMAT(b.LogDateTime, '%Y%m')  'month' ,a.TagName ,sum(a.LastValue - b.LastValue) v from (select * from bwanalogtable where tagname IN ( SELECT distinct(concat(LEFT(tagname,6),'_kWh*05M')) AS tagname FROM webaccess_tags WHERE company_id = ${n} and energy_conversion_factors = 28) ) a join bwanalogtable b on b.TagName=a.TagName AND b.LogDateTime = DATE_SUB(a.LogDateTime,interval 5 minute) WHERE b.LogDateTime < STR_TO_DATE(CONCAT(DATE_FORMAT(NOW(), '%Y-%m-'), '01'), '%Y-%m-%d') and b.LogDateTime > STR_TO_DATE(CONCAT(DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-'), '31'), '%Y-%m-%d') group by \`month\`;`;
            o = await c.query(t)
        }
        return {
            code: 1,
            current: a[0],
            existing: o[0]
        }
    } catch (e) {
        return {
            code: 0
        }
    } finally {
        if (c) {
            c.release()
        }
    }
};
let getAllCompanyKwh = async function(a, t) {
    let o;
    try {
        o = await pool.getConnection();
        let e;
        if (Number(a) === 0) {
            e = ` SELECT id, c.name company, ifnull(\`BEFORE\`, 0) \`BEFORE\`, ifnull(\`USAGE\`, 0) \`USAGE\`, round(ifnull(exist, 0)) exist FROM company c LEFT JOIN ( SELECT b.company_id, b.name, sum(h.\`USAGE\`) \`BEFORE\`, sum(m.\`USAGE\`) \`USAGE\`, log_value exist FROM history_month m LEFT JOIN history_month h ON m.tagname = h.tagname AND h.logdatetime = date_format(curdate() - INTERVAL 1 MONTH, '%Y%m') LEFT JOIN (SELECT * FROM company c INNER JOIN (SELECT company_id, tagname, energy_conversion_factors FROM webaccess_tags) wt ON c.id = wt.company_id AND wt.energy_conversion_factors = 28 INNER JOIN (SELECT company_id AS \`C_ID\`, log_value FROM company_before_kwh) cbk ON c.id = cbk.C_ID ) b ON b.tagname = m.tagname AND b.tagname = h.tagname WHERE m.logdatetime = date_format(curdate(), '%Y%m') GROUP BY b.company_id) a ON a.company_id = c.id WHERE code_id in (${t})`
        } else {
            e = ` SELECT id, c.name company, ifnull(\`BEFORE\`, 0) \`BEFORE\`, ifnull(\`USAGE\`, 0) \`USAGE\`, round(ifnull(exist, 0)) exist FROM company c LEFT JOIN ( SELECT b.company_id, b.name, sum(h.\`USAGE\`) \`BEFORE\`, sum(m.\`USAGE\`) \`USAGE\`, log_value exist FROM history_month m LEFT JOIN history_month h ON m.tagname = h.tagname AND h.logdatetime = date_format(curdate() - INTERVAL 1 MONTH, '%Y%m') LEFT JOIN (SELECT * FROM company c INNER JOIN (SELECT company_id, tagname, energy_conversion_factors FROM webaccess_tags) wt ON c.id = wt.company_id AND wt.energy_conversion_factors = 28 INNER JOIN (SELECT company_id AS \`C_ID\`, log_value FROM company_before_kwh) cbk ON c.id = cbk.C_ID ) b ON b.tagname = m.tagname AND b.tagname = h.tagname WHERE m.logdatetime = date_format(curdate(), '%Y%m') GROUP BY b.company_id) a ON a.company_id = c.id WHERE code_id in (${a})`
        }
        const n = await o.query(e);
        return {
            code: 1,
            getAllCompanyResult: n
        }
    } catch (e) {
        return {
            code: 0,
            message: "응답이 없습니다. 새로고침 후 다시 시도하시기 바랍니다."
        }
    } finally {
        if (o) {
            o.release()
        }
    }
};
let getSumCompanyKwh = async function(a, t, o, n) {
    let m;
    let c;
    try {
        m = await pool.getConnection();
        if (a === "1" || a === "2") {
            if (Number(o) === 0) {
                c = ` SELECT round(sum(ifnull(c.\`LOG_VALUE\`, 0))) \`EXIST\`, ifnull(sum(m.\`USAGE\`), 0) \`USAGE\`, ifnull(sum(m.\`USAGE\`), 0) * t.tCO2 * 0.001 \`TCO2\`, ifnull(sum(b.\`USAGE\`), 0) \`BEFOREUSAGE\`, ifnull(sum(b.\`USAGE\`), 0) * t.tCO2 * 0.001 \`BEFORETCO2\`, IF(ifnull(sum(b.\`USAGE\`), 0) > 0, IFNULL(ROUND(((ifnull(sum(m.\`USAGE\`), 0) / ifnull(sum(b.\`USAGE\`), 0)) * 100) - 100, 2), 0), 0) AS \`PERCENT\` #전월 대비 사용량 증감율 FROM (SELECT tCO2 FROM energy_conversion_factors WHERE id = 28) t, (SELECT w.id, tagname_code, tagname, tag_description, energy_conversion_factors, location_main, location_sub, device_description, company_id, is_install, code, name, address, code_id FROM webaccess_tags w INNER JOIN company c ON w.company_id = c.id) w LEFT OUTER JOIN (SELECT * FROM history_month WHERE logdatetime = date_format(curdate(), '%Y%m')) m ON m.tagname = w.tagname LEFT JOIN (SELECT * FROM history_month WHERE logdatetime = date_format(curdate() - INTERVAL 1 MONTH, '%Y%m')) b ON b.tagname = w.tagname LEFT JOIN (SELECT * FROM company_before_kwh) c ON c.company_id = w.company_id WHERE w.code_id IN (${n})`
            } else {
                c = ` SELECT round(sum(ifnull(c.\`LOG_VALUE\`, 0))) \`EXIST\`, ifnull(sum(m.\`USAGE\`), 0) \`USAGE\`, ifnull(sum(m.\`USAGE\`), 0) * t.tCO2 * 0.001 \`TCO2\`, ifnull(sum(b.\`USAGE\`), 0) \`BEFOREUSAGE\`, ifnull(sum(b.\`USAGE\`), 0) * t.tCO2 * 0.001 \`BEFORETCO2\`, IF(ifnull(sum(b.\`USAGE\`), 0) > 0, IFNULL(ROUND(((ifnull(sum(m.\`USAGE\`), 0) / ifnull(sum(b.\`USAGE\`), 0)) * 100) - 100, 2), 0), 0) AS \`PERCENT\` #전월 대비 사용량 증감율 FROM (SELECT tCO2 FROM energy_conversion_factors WHERE id = 28) t, (SELECT w.id, tagname_code, tagname, tag_description, energy_conversion_factors, location_main, location_sub, device_description, company_id, is_install, code, name, address, code_id FROM webaccess_tags w INNER JOIN company c ON w.company_id = c.id) w LEFT OUTER JOIN (SELECT * FROM history_month WHERE logdatetime = date_format(curdate(), '%Y%m')) m ON m.tagname = w.tagname LEFT JOIN (SELECT * FROM history_month WHERE logdatetime = date_format(curdate() - INTERVAL 1 MONTH, '%Y%m')) b ON b.tagname = w.tagname LEFT JOIN (SELECT * FROM company_before_kwh) c ON c.company_id = w.company_id WHERE w.code_id IN (${o}) AND w.energy_conversion_factors=28 `
            }
        } else {
            c = ` SELECT round(ifnull(c.\`LOG_VALUE\`, 0))  \`EXIST\`, ifnull(sum(m.\`USAGE\`), 0) \`USAGE\`, ifnull(sum(m.\`USAGE\`), 0) * t.tCO2 * 0.001 \`TCO2\`, ifnull(sum(b.\`USAGE\`), 0) \`BEFOREUSAGE\`, ifnull(sum(b.\`USAGE\`), 0) * t.tCO2 * 0.001 \`BEFORETCO2\`, IF(ifnull(sum(b.\`USAGE\`), 0) > 0, IFNULL(ROUND(((ifnull(sum(m.\`USAGE\`), 0) / ifnull(sum(b.\`USAGE\`), 0)) * 100) - 100, 2), 0), 0) AS \`PERCENT\` #전월 대비 사용량 증감율 FROM (SELECT tCO2 FROM energy_conversion_factors WHERE id = 28) t, (SELECT w.id, tagname_code, tagname, tag_description, energy_conversion_factors, location_main, location_sub, device_description, company_id, is_install, code, name, address, code_id FROM webaccess_tags w INNER JOIN company c ON w.company_id = c.id) w LEFT OUTER JOIN (SELECT * FROM history_month WHERE logdatetime = date_format(curdate(), '%Y%m')) m ON m.tagname = w.tagname LEFT JOIN (SELECT * FROM history_month WHERE logdatetime = date_format(curdate() - INTERVAL 1 MONTH, '%Y%m')) b ON b.tagname = w.tagname LEFT JOIN (SELECT * FROM company_before_kwh) c ON c.company_id = w.company_id WHERE w.company_id = ${t};`
        }
        let e = await m.query(c);
        return {
            code: 1,
            getSumCompanyKwhResult: e
        }
    } catch (e) {
        return {
            code: 0
        }
    } finally {
        if (m) {
            m.release()
        }
    }
};
let getCompressorInfo = async function(t) {
    let o;
    try {
        o = await pool.getConnection();
        let e = ` SELECT a.tagname_code, a.device_description, b.company_id, b.compressor_type, b.serial_num, b.model_year, b.load, b.unload FROM( SELECT tagname_code, device_description, company_id FROM webaccess_tags WHERE company_id =${t} and energy_conversion_factors = 33 GROUP BY tagname_code,device_description, company_id) AS a INNER JOIN device_with_company AS b on a.tagname_code = b.tagname_code`;
        let a = await o.query(e);
        return {
            code: 1,
            getCompressorInfoResult: a
        }
    } catch (e) {
        return {
            code: 0
        }
    } finally {
        if (o) {
            o.release()
        }
    }
};
let getLoadData = async function(t) {
    let o;
    try {
        o = await pool.getConnection();
        let e = ` SELECT \`load\`, \`unload\` FROM device_with_company WHERE company_id = ${t}`;
        let a = await o.query(e);
        return {
            code: 1,
            getLoadDataResult: a
        }
    } catch (e) {
        return {
            code: 0
        }
    } finally {
        if (o) {
            o.release()
        }
    }
};
let changeLoadData = async function(a, t, o) {
    let n;
    try {
        n = await pool.getConnection();
        let e = `update device_with_company set \`load\` = ${t}, unload= ${o} where company_id = ${a}`;
        await n.query(e);
        return {
            code: 1,
            message: "출구 압력이 변경되었습니다."
        }
    } catch (e) {
        return {
            code: 0,
            message: "작업에 실패하였습니다. 문제가 지속될 경우 관리자에게 문의해주세요."
        }
    } finally {
        if (n) {
            n.release()
        }
    }
};
let airCompInstallChk = async function(e) {
    let a;
    try {
        a = await pool.getConnection();
        const t = `SELECT is_compressor FROM webaccess_tags WHERE company_id= ${e} AND tagName LIKE'%Com_Outlet*00M';`;
        const o = await a.query(t);
        return {
            code: 1,
            result: o
        }
    } catch (e) {
        return {
            code: 0,
            message: "작업에 실패하였습니다. 문제가 지속될 경우 관리자에게 문의해주세요."
        }
    } finally {
        if (a) {
            a.release()
        }
    }
};
module.exports.getBusinessCode = getBusinessCode;
module.exports.getSumCompanyKwh = getSumCompanyKwh;
module.exports.getCompressorInfo = getCompressorInfo;
module.exports.getAllCompanyKwh = getAllCompanyKwh;
module.exports.getKwh = getKwh;
module.exports.compressData = compressData;
module.exports.deviceInfo = deviceInfo;
module.exports.getCompany = getCompany;
module.exports.getLoadData = getLoadData;
module.exports.changeLoadData = changeLoadData;
module.exports.airCompInstallChk = airCompInstallChk;