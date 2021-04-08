var vJSON = {
    DEVICE: [],
    ANALOGINPUTS: [],
    DIGITALINPUTS: [],
    COUNTERS: [],
    DIGITALOUTPUTS: [],
    CALCULATEDANALOGINPUTS: [],
    CONVERTERS: [],
    SPECIALPROTECTIONS: [],
    SPM: [],
    SERVICEPLAN: [],
    ANALOGOUTPUTS: [],
    ES:
        {
            ACTIVE: false,
            NRCOMPRESSORS: null,
            NRDRYERS: null,
            STATE: null,
            REGULATIONPRESSURE: null,
            CONTROLVSD: null,
            COMPRESSORS: [],
            DRYERS: [],
            COMPRESSORMASTERBAR: null,
            DRYERMASTERBAR: null
        }
};

function Q_2000_AI(QUESTIONS)
{
    for(var i=0x2010;i<0x2090;i++)
    {
        QUESTIONS.Add(i,1);
        QUESTIONS.Add(i,4);
    }
}
function A_2000_AI(QUESTIONS,JSON)
{
    var error="";
    for(var i=0x2010;i<0x2090;i++)
    {
        try {
            if (QUESTIONS.getData(i, 1).Byte(0) != 0) {
                var vAnalogInput = new AnalogInput();
                vAnalogInput.MPL = QUESTIONS.getData(i, 1).UInt16(1);
                vAnalogInput.INPUTTYPE = QUESTIONS.getData(i, 1).Byte(1);
                vAnalogInput.DISPLAYPRECISION = QUESTIONS.getData(i, 4).Byte(3);
                vAnalogInput.RTD_SI = i - 0x2010 + 1;
                JSON[JSON.length] = vAnalogInput;
            }
        }
        catch (e) {
            if (e.name == "ERROR")
            {
                if(error=="")
                    error += "ANALOG INPUTS :<br />"+e.message;
                else
                    error += e.message;
                error += "<br />";
            }
        }
    }
    return error;
}
function Q_3000_AI(QUESTIONS,JSON)
{
    for(var i=0;i<JSON.length;i++)
        QUESTIONS.Add(0x3002,JSON[i].RTD_SI);
}
function A_3000_AI(QUESTIONS,JSON)
{
    var error = "";
    for(var i=0;i<JSON.length;i++)
    {
        try
        {
            JSON[i].setData(QUESTIONS.getData(0x3002,JSON[i].RTD_SI));
        }
        catch (e) {
            if(error=="")
                error += "ANALOG INPUTS :<br />"+e.message;
            else
                error += e.message;
            error += "<br />";
        }
    }
    return error;
}
function AnalogInput()
{
    //PRIVATE
    var vDATA=null;

    //PUBLIC
    this.MPL=null;
    this.INPUTTYPE=null;
    this.DISPLAYPRECISION=null;
    this.RTD_SI=null;
    this.setData=function(DATA)
    {
        vDATA=DATA;
    }
    this.getValue=function()
    {
        return vDATA.Int16(1);
    }
    this.getStatus=function()
    {
        return vDATA.UInt16(0);
    }

}

function Q_2000_AO(QUESTIONS)
{
    for(var i=0x2150;i<0x2170;i++)
    {
        QUESTIONS.Add(i,1);
        QUESTIONS.Add(i,3);
    }
}
function A_2000_AO(QUESTIONS,JSON)
{
    var error = "";
    for(var i=0x2150;i<0x2170;i++)
    {
        try
        {
            var vStatus=(QUESTIONS.getData(i,1).Byte(0)!=0);
            if(vStatus)
            {
                var vAnalogOutput=new AnalogOutput();

                vAnalogOutput.MPL=QUESTIONS.getData(i,1).UInt16(1);
                vAnalogOutput.OUTPUTTYPE=QUESTIONS.getData(i,1).Byte(1);
                vAnalogOutput.DISPLAYPRECISION=QUESTIONS.getData(i,3).Byte(3);
                vAnalogOutput.RTD_SI=i-0x2150+1;
                JSON[JSON.length]=vAnalogOutput;
            }
        }
        catch(e){
            if (e.name == "ERROR")
            {
                if(error=="")
                    error += "ANALOG OUTPUTS :<br />"+e.message;
                else
                    error += e.message;
                error += "<br />";
            }
        }
    }
    return error;
}
function Q_3000_AO(QUESTIONS,JSON)
{
    for(var i=0;i<JSON.length;i++)
        QUESTIONS.Add(0x3006,JSON[i].RTD_SI);
}
function A_3000_AO(QUESTIONS,JSON)
{
    var error = "";
    for(var i=0;i<JSON.length;i++)
    {
        try
        {
            JSON[i].setData(QUESTIONS.getData(0x3006,JSON[i].RTD_SI));
        }
        catch(e){
            if(error=="")
                error += "ANALOG OUTPUTS :<br />"+e.message;
            else
                error += e.message;
            error += "<br />";
        }
    }
    return error;
}
function AnalogOutput()
{
    //PRIVATE
    var vDATA=null;

    //PUBLIC
    this.MPL=null;
    this.OUTPUTTYPE=null;
    this.DISPLAYPRECISION=null;
    this.RTD_SI=null;
    this.setData=function(DATA)
    {
        vDATA=DATA;
    }
    this.getValue=function()
    {
        return vDATA.Int16(1);
    }
    this.getStatus=function()
    {
        return vDATA.UInt16(0);
    }
}

function Q_2000_CAI(QUESTIONS)
{
    for(var i=0x2090;i<0x20b0;i++)
    {
        QUESTIONS.Add(i,1);
        QUESTIONS.Add(i,3);
    }
}
function A_2000_CAI(QUESTIONS,JSON)
{
    var error = "";
    for(var i=0x2090;i<0x20b0;i++)
    {
        try
        {
            var vStatus=(QUESTIONS.getData(i,1).Byte(0)!=0);
            if(vStatus)
            {
                var vCalculatedAnalogInput=new CalculatedAnalogInput();
                vCalculatedAnalogInput.MPL=QUESTIONS.getData(i,1).UInt16(1);
                vCalculatedAnalogInput.INPUTTYPE=QUESTIONS.getData(i,1).Byte(1);
                vCalculatedAnalogInput.DISPLAYPRECISION=QUESTIONS.getData(i,3).Byte(3);
                vCalculatedAnalogInput.RTD_SI=i-0x2090+1;
                JSON[JSON.length]=vCalculatedAnalogInput;
            }
        }
        catch(e){
            if (e.name == "ERROR")
            {
                if(error=="")
                    error += "CALCULATED ANALOG INPUTS :<br />"+e.message;
                else
                    error += e.message;
                error += "<br />";
            }
        }
    }
    return error;
}
function Q_3000_CAI(QUESTIONS,JSON)
{
    for(var i=0;i<JSON.length;i++)
        QUESTIONS.Add(0x3004,JSON[i].RTD_SI);
}
function A_3000_CAI(QUESTIONS,JSON)
{
    var error="";
    for(var i=0;i<JSON.length;i++)
    {
        try
        {
            JSON[i].setData(QUESTIONS.getData(0x3004,JSON[i].RTD_SI));
        }
        catch(e){
            if(error=="")
                error += "CALCULATED ANALOG INPUTS :<br />"+e.message;
            else
                error += e.message;
            error += "<br />";
        }
    }
    return error;
}
function CalculatedAnalogInput()
{
    //PRIVATE
    var vDATA=null;

    //PUBLIC
    this.MPL=null;
    this.INPUTTYPE=null;
    this.DISPLAYPRECISION=null;
    this.RTD_SI=null;
    this.setData=function(DATA)
    {
        vDATA=DATA;
    }
    this.getValue=function()
    {
        return vDATA.Int16(1);
    }
    this.getStatus=function()
    {
        return vDATA.UInt16(0);
    }
}

function Q_2000_CNV(QUESTIONS)
{
    for(var i=0x2681;i<0x2689;i++)
    {
        QUESTIONS.Add(i,1);
        QUESTIONS.Add(i,7);
    }
}
function A_2000_CNV(QUESTIONS,JSON)
{
    var error="";
    for(var i=0x2681;i<0x2689;i++)
    {
        try
        {
            var vStatus=(QUESTIONS.getData(i,1).Byte(0)!=0);
            if(vStatus)
            {
                var vConverter=new Converter();
                vConverter.CONVERTERTYPE=QUESTIONS.getData(i,1).Byte(1);
                vConverter.CONVERTERDEVICETYPE=QUESTIONS.getData(i,7).Byte(0);
                vConverter.RTD_SI=i-0x2681+1;
                JSON[JSON.length]=vConverter;
            }
        }
        catch(e){
            if (e.name == "ERROR")
            {
                if(error=="")
                    error += "CONVERTERS :<br />"+e.message;
                else
                    error += e.message;
                error += "<br />";
            }
        }
    }
    return error;
}
function Q_3000_CNV(QUESTIONS,JSON)
{
    QUESTIONS.Add(0x3021,5);
    for(var i=0;i<JSON.length;i++)
        QUESTIONS.Add(0x3020+JSON[i].RTD_SI,1);
}
function A_3000_CNV(QUESTIONS,JSON)
{
    var error="";
    for(var i=0;i<JSON.length;i++)
    {
        try
        {
            JSON[i].setData(QUESTIONS.getData(0x3020+JSON[i].RTD_SI,1),QUESTIONS.getData(0x3021,5));
        }
        catch(e){
            if(error=="")
                error += "CONVERTERS :<br />"+e.message;
            else
                error += e.message;
            error += "<br />";
        }
    }
    return error;
}
function Converter()
{
    //PRIVATE
    var vDATA=null;
    var vFLOW=null;

    //PUBLIC
    this.CONVERTERTYPE=null;
    this.CONVERTERDEVICETYPE=null;
    this.RTD_SI=null;
    this.setData=function(DATA,FLOW)
    {
        vDATA=DATA;
        vFLOW=FLOW;
    }
    this.getValue=function()
    {
        return vDATA.UInt16(1);
    }
    this.getFlow=function()
    {
        return vFLOW.UInt16(0);
    }
}

function Q_2000_CNT(QUESTIONS)
{
    for(var i=1;i<256;i++)
        QUESTIONS.Add(0x2607,i);
}
function A_2000_CNT(QUESTIONS,JSON)
{
    var error="";
    for(var i=1;i<256;i++)
    {
        try
        {
            var vStatus=(QUESTIONS.getData(0x2607,i).Byte(0)!=0);
            if(vStatus)
            {
                var vCounter=new Counter();
                vCounter.MPL=QUESTIONS.getData(0x2607,i).UInt16(1);
                vCounter.COUNTERUNIT=QUESTIONS.getData(0x2607,i).Byte(1);
                vCounter.RTD_SI=i;
                JSON[JSON.length]=vCounter;
            }
        }
        catch(e){
            if (e.name == "ERROR")
            {
                if(error=="")
                    error += "COUNTERS :<br />"+e.message;
                else
                    error += e.message;
                error += "<br />";
            }
        }
    }
    return error;
}
function Q_3000_CNT(QUESTIONS,JSON)
{
    for(var i=0;i<JSON.length;i++)
        QUESTIONS.Add(0x3007,JSON[i].RTD_SI);
}
function A_3000_CNT(QUESTIONS,JSON)
{
    var error="";
    for(var i=0;i<JSON.length;i++)
    {
        try
        {
            JSON[i].setData(QUESTIONS.getData(0x3007,JSON[i].RTD_SI));
        }
        catch(e){
            if(error=="")
                error += "COUNTERS :<br />"+e.message;
            else
                error += e.message;
            error += "<br />";
        }
    }
    return error;
}
function Counter()
{
    //PRIVATE
    var vDATA=null;

    //PUBLIC
    this.MPL=null;
    this.RTD_SI=null;
    this.COUNTERUNIT=null;
    this.setData=function(DATA)
    {
        vDATA=DATA;
    }
    this.getValue=function()
    {
        return vDATA.UInt32();
    }
}

function calculate_counter_percentages(json) {
    var raw = new Array();
    var sum = 0;

    for(var i in json) {
        if(json[i].MPL >= 2706 && json[i].MPL <= 2710) {
            raw[json[i].MPL] = json[i].getValue();
            sum += raw[json[i].MPL];
        }
    }

    if(raw.length != 0 && sum != 0) {
        var quotients = new Array();
        var rests = new Array();

        for(var i in raw) {
            quotients[i] = Math.floor(raw[i] * 100 / sum);
            rests[i] = ((raw[i]*100) % sum);
        }

        while(true) {
            var quotient_sum = 0;
            var max = 0;
            var max_index = 0;
            for(var i in quotients) {
                quotient_sum += quotients[i];

                if(rests[i] > max) {
                    max = rests[i];
                    max_index = i;
                }
            }

            if(quotient_sum == 100) {
                return quotients;
            } else{
                quotients[max_index]++;
                rests[max_index] = 0;
            }
        }
    }
    else if(raw.length ==0) {
        return new Array();
    } else {
        return raw;
    }
}

function Q_3000_MS(QUESTIONS)
{
    QUESTIONS.Add(0x3001,8);
}

function A_3000_MS(QUESTIONS,JSON)
{
    var error = "";
    try
    {
        JSON[0]=QUESTIONS.getData(0x3001,8).UInt16(0);
    }
    catch(e){
        if(error=="")
            error += "MACHINE STATE :<br />"+e.message;
        else
            error += e.message;
        error += "<br />";
    }
    return error;
}

function Q_2000_MMT(QUESTIONS)
{
    QUESTIONS.Add(0x2001,1);
}

function A_2000_MMT(QUESTIONS,JSON) {
    var error = "";
    try
    {
        JSON[0]=QUESTIONS.getData(0x2001,1).Byte(0);
    }
    catch(e){
        if (e.name == "ERROR")
        {
            if(error=="")
                error += "MACHINE STATE :<br />"+e.message;
            else
                error += e.message;
            error += "<br />";
        }
    }
    return error;
}

function Q_2000_DI(QUESTIONS)
{
    for(var i=0x20b0;i<0x2100;i++)
        QUESTIONS.Add(i,1);
}
function A_2000_DI(QUESTIONS,JSON)
{
    var error="";
    for(var i=0x20b0;i<0x2100;i++)
    {
        try
        {
            var vStatus=(QUESTIONS.getData(i,1).Byte(0)!=0);
            if(vStatus)
            {
                var vDigitalInput=new DigitalInput();
                vDigitalInput.MPL=QUESTIONS.getData(i,1).UInt16(1);
                vDigitalInput.RTD_SI=i-0x20b0+1;
                JSON[JSON.length]=vDigitalInput;
            }
        }
        catch(e){
            if (e.name == "ERROR")
            {
                if(error=="")
                    error += "DIGITAL INPUTS :<br />"+e.message;
                else
                    error += e.message;
                error += "<br />";
            }
        }
    }
    return error;
}
function Q_3000_DI(QUESTIONS,JSON)
{
    for(var i=0;i<JSON.length;i++)
        QUESTIONS.Add(0x3003,JSON[i].RTD_SI);
}
function A_3000_DI(QUESTIONS,JSON)
{
    var error = "";
    for(var i=0;i<JSON.length;i++)
    {
        try
        {
            JSON[i].setData(QUESTIONS.getData(0x3003,JSON[i].RTD_SI));
        }
        catch(e){
            if(error=="")
                error += "DIGITAL INPUTS :<br />"+e.message;
            else
                error += e.message;
            error += "<br />";
        }
    }
    return error;
}
function DigitalInput()
{
    //PRIVATE
    var vDATA=null;

    //PUBLIC
    this.MPL=null;
    this.RTD_SI=null;
    this.setData=function(DATA)
    {
        vDATA=DATA;
    }
    this.getValue=function()
    {
        return vDATA.UInt16(1);
    }
    this.getStatus=function()
    {
        return vDATA.UInt16(0);
    }
}

function Q_2000_DO(QUESTIONS)
{
    for(var i=0x2100;i<0x2150;i++)
        QUESTIONS.Add(i,1);
}
function A_2000_DO(QUESTIONS,JSON)
{
    var error="";
    for(var i=0x2100;i<0x2150;i++)
    {
        try
        {
            var vStatus=(QUESTIONS.getData(i,1).Byte(0)!=0);
            if(vStatus)
            {
                var vDigitalOutput=new DigitalOutput();
                vDigitalOutput.MPL=QUESTIONS.getData(i,1).UInt16(1);
                vDigitalOutput.RTD_SI=i-0x2100+1;
                JSON[JSON.length]=vDigitalOutput;
            }
        }
        catch(e){
            if (e.name == "ERROR")
            {
                if(error=="")
                    error += "DIGITAL OUTPUTS :<br />"+e.message;
                else
                    error += e.message;
                error += "<br />";
            }
        }
    }
    return error;
}
function Q_3000_DO(QUESTIONS,JSON)
{
    for(var i=0;i<JSON.length;i++)
        QUESTIONS.Add(0x3005,JSON[i].RTD_SI);
}
function A_3000_DO(QUESTIONS,JSON)
{
    var error="";
    for(var i=0;i<JSON.length;i++)
    {
        try
        {
            JSON[i].setData(QUESTIONS.getData(0x3005,JSON[i].RTD_SI));
        }
        catch(e){
            if(error=="")
                error += "<br />DIGITAL OUTPUTS :<br />"+e.message;
            else
                error += e.message;
            error += "<br />";
        }
    }
    return error;
}
function DigitalOutput()
{
    //PRIVATE
    var vDATA=null;

    //PUBLIC
    this.MPL=null;
    this.RTD_SI=null;
    this.setData=function(DATA)
    {
        vDATA=DATA;
    }
    this.getValue=function()
    {
        return vDATA.UInt16(1);
    }
    this.getStatus=function()
    {
        return vDATA.UInt16(0);
    }
}



function Q_3000_ES(QUESTIONS)
{
    QUESTIONS.Add(0x3113,1);
    for(var i=3;i<=5;i++)
        QUESTIONS.Add(0x3113,i);
    for(var i=7;i<=30;i++)
        QUESTIONS.Add(0x3113,i);
    for(var i=31;i<=42;i++)
        QUESTIONS.Add(0x3113,i);
    for(var i=1;i<=18;i++)
        QUESTIONS.Add(0x3114,i);
}
function A_3000_ES(QUESTIONS,JSON)
{
    var error="";
    try
    {
        JSON.NRCOMPRESSORS=QUESTIONS.getData(0x3113,1).Byte(0);
        JSON.NRDRYERS=QUESTIONS.getData(0x3113,1).Byte(2);
        JSON.ACTIVE=(QUESTIONS.getData(0x3113,1).Byte(1)==1);
        JSON.STATE=QUESTIONS.getData(0x3113,3).UInt16(0);
        JSON.REGULATIONPRESSURE=QUESTIONS.getData(0x3113,4).UInt32();
        JSON.CONTROLVSD=QUESTIONS.getData(0x3113,5).Byte(2);

        for(var i=0;i<JSON.NRCOMPRESSORS;i++)
        {
            var vSlave=new Slave();
            vSlave.MIN=QUESTIONS.getData(0x3113,7+4*i).UInt16(1);
            vSlave.ACT=QUESTIONS.getData(0x3113,8+4*i).UInt16(0);
            vSlave.MAX=QUESTIONS.getData(0x3113,8+4*i).UInt16(1);
            vSlave.TYPE=QUESTIONS.getData(0x3113,7+4*i).Byte(1);
            vSlave.MS=QUESTIONS.getData(0x3113,7+4*i).Byte(0);
            vSlave.SUMMARY1=QUESTIONS.getData(0x3113,9+4*i).UInt32();
            vSlave.SUMMARY2=QUESTIONS.getData(0x3113,10+4*i).UInt32();
            JSON.COMPRESSORS[i]=vSlave;
        }
        for(var i=0;i<JSON.NRDRYERS;i++)
        {
            var vDryer=new Dryer();
            vDryer.UPPERICON=QUESTIONS.getData(0x3113,31+2*i).Int16(1);
            vDryer.LOWERICON=QUESTIONS.getData(0x3113,31+2*i).Int16(0);
            vDryer.BARVALUE=QUESTIONS.getData(0x3113,32+2*i).Byte(0);
            JSON.DRYERS[i]=vDryer;
        }
        if(JSON.NRCOMPRESSORS>0)
        {
            var vMasterBar=new MasterBar();
            vMasterBar.LEVEL1=QUESTIONS.getData(0x3114,1).Int32();
            vMasterBar.LEVEL2=QUESTIONS.getData(0x3114,2).Int32();
            vMasterBar.ACT=QUESTIONS.getData(0x3114,3).Int32();
            vMasterBar.INRANGE=QUESTIONS.getData(0x3114,4).Byte(1);
            vMasterBar.PERCENTAGE=QUESTIONS.getData(0x3114,4).Byte(0);
            vMasterBar.METHODOFFILLING=QUESTIONS.getData(0x3114,4).Byte(2);
            vMasterBar.TYPE=QUESTIONS.getData(0x3114,4).Byte(3);//0-->25/75 1-->0/100
            JSON.COMPRESSORMASTERBAR=vMasterBar;
        }

        if(JSON.NRDRYERS>0)
        {
            var vDryerMasterBar=new DryerMasterBar();
            vDryerMasterBar.LEVEL1=QUESTIONS.getData(0x3114,7).Int32();
            vDryerMasterBar.LEVEL2=QUESTIONS.getData(0x3114,8).Int32();
            vDryerMasterBar.ACT=QUESTIONS.getData(0x3114,9).Int32();
            vDryerMasterBar.INRANGE=QUESTIONS.getData(0x3114,10).Byte(1);
            vDryerMasterBar.PERCENTAGE=QUESTIONS.getData(0x3114,10).Byte(0);
            vDryerMasterBar.METHODOFFILLING=QUESTIONS.getData(0x3114,10).Byte(2);
            vDryerMasterBar.TYPE=QUESTIONS.getData(0x3114,10).Byte(3);//0-->25/75 1-->0/100
            JSON.DRYERMASTERBAR=vDryerMasterBar;
        }
    }
    catch(e){
        if (e.name == "ERROR")
        {
            if(error=="")
                error += "<br />ES :<br />"+e.message;
            else
                error += e.message;
            error += "<br />";
        }
    }
    return error;
}

function Dryer()
{
    //PUBLIC
    this.UPPERICON=null;
    this.LOWERICON=null;
    this.BARVALUE=null;
}

function Slave()
{
    //PUBLIC
    this.MIN=null;
    this.ACT=null;
    this.MAX=null;
    this.TYPE=null;
    this.MS=null;
    this.SUMMARY1=null;
    this.SUMMARY2=null;
}

function DryerMasterBar()
{
    //PUBLIC
    this.LEVEL1=null;
    this.LEVEL2=null;
    this.ACT=null;
    this.INRANGE=null;
    this.PERCENTAGE=null;
    this.METHODOFFILLING=null;
    this.TYPE=null;
}

function MasterBar()
{
    //PUBLIC
    this.LEVEL1=null;
    this.LEVEL2=null;
    this.ACT=null;
    this.INRANGE=null;
    this.PERCENTAGE=null;
    this.METHODOFFILLING=null;
    this.TYPE=null;
}
function Questions()
{
    //PRIVATE
    var vQUESTIONS=new Array();
    function Post(URL,QUESTION)
    {
        var return_data = null;
        // $.ajax({
        //     url: URL,
        //     type: "POST",
        // 	timeout : 2000,
        //     data: "QUESTION=" + QUESTION,
        //     success: function(data, textStatus, jqXHR) {
        //         return_data = data;
        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         throw new Error("Unable to complete HTTP post (url = '"+URL+"' , status = '"+jqXHR.status+"')" );
        //     }
        // });

        return return_data;
    }
    function HexString(VALUE,LENGTH)
    {
        var v=VALUE.toString(16);
        while(v.length<LENGTH)
            v="0"+v;
        return v;
    }

    //PUBLIC
    this.Add=function(INDEX,SUBINDEX)
    {
        var vQuestion=new Question();
        vQuestion.INDEX=INDEX;
        vQuestion.SUBINDEX=SUBINDEX;
        vQUESTIONS[vQUESTIONS.length]=vQuestion;
    }
    this.getData = function(INDEX, SUBINDEX) {
        for (var i = 0; i < vQUESTIONS.length; i++) {
            if ((vQUESTIONS[i].INDEX == INDEX) && (vQUESTIONS[i].SUBINDEX == SUBINDEX)) {
                var Data = vQUESTIONS[i].getData();
                if (Data.DATA == "X")
                    throw { name: "NO DATA", message: "[" + HexString(INDEX, 4) + "," + SUBINDEX + "]" };
                else
                    return Data;
            }
        }
        throw { name: "ERROR", message: "[" + HexString(INDEX, 4) + "," + SUBINDEX + "]" };
    }
    this.SendReceive = function() {
        for (var idx = 0; idx < vQUESTIONS.length; idx += 1000) {
            var vQuestionsSlice;
            if ((vQUESTIONS.length - idx) <= 1000)
                vQuestionsSlice = vQUESTIONS.slice(idx, vQUESTIONS.length);
            else
                vQuestionsSlice = vQUESTIONS.slice(idx, idx + 1000);

            var vQuestions = "";
            for (var iQ = 0; iQ < vQuestionsSlice.length; iQ++)
                vQuestions += HexString(vQuestionsSlice[iQ].INDEX, 4) + HexString(vQuestionsSlice[iQ].SUBINDEX, 2);
            console.log(vQuestions)
            var vAnswers = Post("http://"+"191.168.0.14:3001"+"/cgi-bin/mkv.cgi",vQuestions);
            console.log(idx)
            for (var iQ = 0, iA = 0; iQ < vQuestionsSlice.length; iQ++) {
                if (vAnswers != null && vAnswers.charAt(iA) != "X") {
                    vQuestionsSlice[iQ].setData(vAnswers.substring(iA, iA + 8));
                    iA += 8;
                }
                else {
                    vQuestionsSlice[iQ].setData("X");
                    iA++;
                }
            }
        }
    }
}
function Question() {
    //PRIVATE
    var vDATA=null;

    //PUBLIC
    this.INDEX=0;
    this.SUBINDEX=0;
    this.setData = function(DATA) {
        var vData = new Data();
        vData.DATA = DATA;
        vDATA = vData;
    }
    this.getData = function(){return vDATA;}
}
function Data() {
    this.DATA=null;

    this.UInt32=function()  {
        return parseInt(this.DATA,16);
    }
    this.Int32=function() {
        var v=parseInt(this.DATA,16);
        if(v>>>31)
            v=-2147483648+(v&0x7FFFFFFF);
        return v;
    }
    this.UInt16=function(WORD) {
        return parseInt(this.DATA.substring((1-WORD)*4,(2-WORD)*4),16);
    }
    this.Int16=function(WORD) {
        var v=parseInt(this.DATA.substring((1-WORD)*4,(2-WORD)*4),16);
        if(v>>>15)
            v=-32768+(v&0x00007FFF);
        return v;
    }
    this.Byte = function(BYTE) {
        return parseInt(this.DATA.substring((3-BYTE)*2,(4-BYTE)*2),16);
    }
}







function Q_2000_SPL(QUESTIONS)
{
    for(var i=1;i<21;i++)
        QUESTIONS.Add(0x2602,i);
}
function A_2000_SPL(QUESTIONS,JSON)
{
    var error="";
    for(var i=1;i<21;i++)
    {
        try
        {
            var vSTATICVALUE=QUESTIONS.getData(0x2602,i).UInt32();
            if(vSTATICVALUE != 0)
            {
                var vServicePlan = new ServicePlan();
                vServicePlan.STATICVALUE = vSTATICVALUE;
                vServicePlan.RTD_SI = (i%2==0?16+i/2:6+(i-1)/2);
                vServicePlan.LEVEL = Math.ceil(i/2);
                vServicePlan.setType(i%2);
                JSON[JSON.length] = vServicePlan;
            }
        }
        catch(e){
            if (e.name == "ERROR")
            {
                if(error=="")
                    error += "SERVICE PLAN :<br />"+e.message;
                else
                    error += e.message;
                error += "<br />";
            }
        }
    }
    return error;
}
function Q_3000_SPL(QUESTIONS,JSON)
{
    QUESTIONS.Add(0x3009,1);
    for(var i=0;i<JSON.length;i++)
        QUESTIONS.Add(0x3009,JSON[i].RTD_SI);
}
function A_3000_SPL(QUESTIONS,JSON)
{
    var error="";
    for(var i=0;i<JSON.length;i++)
    {
        try
        {
            JSON[i].setData(QUESTIONS.getData(0x3009,JSON[i].RTD_SI),QUESTIONS.getData(0x3009,1));
        }
        catch(e){
            if(error=="")
                error += "SERVICE PLAN :<br />"+e.message;
            else
                error += e.message;
            error += "<br />";
        }
    }
    return error;
}
function ServicePlan()
{
    //PRIVATE
    var vDATA=null;
    var vNEXT=null;
    var vType=null;

    //PUBLIC
    this.STATICVALUE=null;
    this.RTD_SI=null;
    this.LEVEL=null;
    this.getNext=function() {
        return vNEXT;
    }
    this.setType=function(type) {
        vType = type;
    }
    this.getType=function() {
        return vType == 1;
    }
    this.setData=function(DATA, NEXT)
    {
        vDATA = DATA;
        vNEXT = ((NEXT.UInt32() >>> this.LEVEL - 1) & 1 == 1);
    }
    this.getValue=function()
    {
        return vDATA.UInt32();
    }
}

function Q_2000_SPR(QUESTIONS)
{
    for(var i=0x2300;i<0x247F;i++)
        QUESTIONS.Add(i,1);
}
function A_2000_SPR(QUESTIONS,JSON)
{
    var error = "";
    for(var i=0x2300;i<0x247F;i++)
    {
        try
        {
            var vStatus=(QUESTIONS.getData(i,1).Byte(0)!=0);
            if(vStatus)
            {
                var vSpecialProtection=new SpecialProtection();
                vSpecialProtection.MPL=QUESTIONS.getData(i,1).UInt16(1);
                vSpecialProtection.RTD_SI=i-0x2300+1;
                JSON[JSON.length]=vSpecialProtection;
            }
        }
        catch(e){
            if (e.name == "ERROR")
            {
                if(error=="")
                    error += "SPECIAL PROTECTIONS :<br />"+e.message;
                else
                    error += e.message;
                error += "<br />";
            }
        }
    }
    return error;
}
function Q_3000_SPR(QUESTIONS,JSON)
{
    for(var i=0;i<JSON.length;i++)
        QUESTIONS.Add(0x300E,JSON[i].RTD_SI);
}
function A_3000_SPR(QUESTIONS,JSON)
{
    var error="";
    for(var i=0;i<JSON.length;i++)
    {
        try
        {
            JSON[i].setData(QUESTIONS.getData(0x300E,JSON[i].RTD_SI));
        }
        catch(e){
            if(error=="")
                error += "SPECIAL PROTECTIONS :<br />"+e.message;
            else
                error += e.message;
            error += "<br />";
        }
    }
    return error;
}
function SpecialProtection()
{
    //PRIVATE
    var vDATA=null;

    //PUBLIC
    this.MPL=null;
    this.RTD_SI=null;
    this.setData=function(DATA) {
        vDATA=DATA;
    }
    this.getStatus=function() {
        return vDATA.UInt16(0);
    }
}



function Q_2000_SPM(QUESTIONS)
{
    for(var i=0x2560;i<0x2570;i++)
        QUESTIONS.Add(i,1);
}
function A_2000_SPM(QUESTIONS,JSON)
{
    var error = "";
    for(var i=0x2560;i<0x2570;i++)
    {
        try
        {
            var vStatus=(QUESTIONS.getData(i,1).Byte(0)!=0);
            if(vStatus)
            {
                var vSPM=new SPM();
                vSPM.MPL=QUESTIONS.getData(i,1).UInt16(1);
                vSPM.RTD_SI=2*(i-0x2560)+1;
                JSON[JSON.length]=vSPM;
            }
        }
        catch(e){
            if (e.name == "ERROR")
            {
                if(error=="")
                    error += "SPM :<br />"+e.message;
                else
                    error += e.message;
                error += "<br />";
            }
        }
    }
    return error;
}
function Q_3000_SPM(QUESTIONS,JSON)
{
    for(var i=0;i<JSON.length;i++)
    {
        QUESTIONS.Add(0x3015,JSON[i].RTD_SI);
        QUESTIONS.Add(0x3015,JSON[i].RTD_SI+1);
    }
}
function A_3000_SPM(QUESTIONS,JSON)
{
    var error = "";
    for(var i=0;i<JSON.length;i++)
    {
        try
        {
            JSON[i].setData(QUESTIONS.getData(0x3015,JSON[i].RTD_SI),QUESTIONS.getData(0x3015,JSON[i].RTD_SI+1));
        }
        catch(e){
            if(error=="")
                error += "SPM :<br />"+e.message;
            else
                error += e.message;
            error += "<br />";
        }
    }
    return error;
}
function SPM()
{
    //PRIVATE
    var vDATA1=null;
    var vDATA2=null;

    //PUBLIC
    this.MPL=null;
    this.RTD_SI=null;
    this.setData=function(DATA1,DATA2)
    {
        vDATA1=DATA1;
        vDATA2=DATA2;
    }
    this.getValue=function()
    {
        var dBm=vDATA1.Byte(3);
        dBm=(dBm<10?'0':'')+dBm;
        var dBc=vDATA1.Byte(2);
        dBc=(dBc<10?'0':'')+dBc;

        var Status=vDATA1.UInt16(0);
        var SensorError=((Status & 0x0040)==0x0040);
        var Set=((Status & 0x0080)==0x0080);
        var Valid=((Status & 0x0100)==0x0100);

        if(!Valid)
            return '-- dBcsv / -- dBmsv';
        else
        {
            if(!SensorError)
            {
                var date=new Date(vDATA2.UInt32()*1000);
                var day=date.getDate();
                day=(day<10?'0':'')+day;
                var month=date.getMonth()+1;
                month=(month<10?'0':'')+month;
                var year=date.getFullYear();
                var hours=date.getUTCHours();
                hours=(hours<10?'0':'')+hours;
                var minutes=date.getMinutes();
                minutes=(minutes<10?'0':'')+minutes;
                var timestamp=day+'/'+month+'/'+year+' - '+hours+':'+minutes;

                return timestamp + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + dBc +' dBcsv / ' + dBm +' dBmsv';
            }
            else
                return null;
        }
    }
    this.getStatus=function()
    {
        return vDATA1.Byte(0);
    }
}




function load_settings() {
    var vQuestions = new Questions();

    Q_2000_AI(vQuestions);
    Q_2000_DI(vQuestions);
    Q_2000_CNT(vQuestions);
    Q_2000_CNV(vQuestions);
    Q_2000_DO(vQuestions);
    Q_2000_CAI(vQuestions);
    Q_2000_CNV(vQuestions);
    Q_2000_SPR(vQuestions);
    Q_2000_AO(vQuestions);
    Q_2000_SPM(vQuestions);
    Q_3000_ES(vQuestions);
    Q_2000_SPL(vQuestions);
    Q_2000_MMT(vQuestions);

    var error = "";
    try {
        vQuestions.SendReceive();
        error += A_2000_AI(vQuestions, vJSON.ANALOGINPUTS);
        error += A_2000_DI(vQuestions, vJSON.DIGITALINPUTS);
        error += A_2000_CNT(vQuestions, vJSON.COUNTERS);
        error += A_2000_CNV(vQuestions, vJSON.CONVERTERS);
        error += A_2000_DO(vQuestions, vJSON.DIGITALOUTPUTS);
        error += A_2000_CAI(vQuestions, vJSON.CALCULATEDANALOGINPUTS);
        error += A_2000_SPR(vQuestions, vJSON.SPECIALPROTECTIONS);
        error += A_2000_AO(vQuestions, vJSON.ANALOGOUTPUTS);
        error += A_2000_SPM(vQuestions, vJSON.SPM);
        error += A_3000_ES(vQuestions, vJSON.ES);
        error += A_2000_SPL(vQuestions, vJSON.SERVICEPLAN);
        error += A_2000_MMT(vQuestions, vJSON.DEVICE);

    }
    catch (e) {
    }
}
function refresh_data() {
    var vQuestions = new Questions();

    Q_3000_AI(vQuestions, vJSON.ANALOGINPUTS);
    Q_3000_DI(vQuestions,vJSON.DIGITALINPUTS);
    Q_3000_CNT(vQuestions,vJSON.COUNTERS);
    Q_3000_CNV(vQuestions,vJSON.CONVERTERS);
    Q_3000_DO(vQuestions,vJSON.DIGITALOUTPUTS);
    Q_3000_CAI(vQuestions,vJSON.CALCULATEDANALOGINPUTS);
    Q_3000_SPR(vQuestions,vJSON.SPECIALPROTECTIONS);
    Q_3000_AO(vQuestions,vJSON.ANALOGOUTPUTS);
    Q_3000_SPM(vQuestions,vJSON.SPM);
    Q_3000_ES(vQuestions,vJSON.ES);
    Q_3000_SPL(vQuestions,vJSON.SERVICEPLAN);
    Q_3000_MS(vQuestions);

    var error = "";
    try {
        vQuestions.SendReceive();

        error += A_3000_AI(vQuestions, vJSON.ANALOGINPUTS);
        error += A_3000_DI(vQuestions,vJSON.DIGITALINPUTS);
        error += A_3000_CNT(vQuestions,vJSON.COUNTERS);
        error += A_3000_CNV(vQuestions,vJSON.CONVERTERS);
        error += A_3000_DO(vQuestions,vJSON.DIGITALOUTPUTS);
        error += A_3000_CAI(vQuestions,vJSON.CALCULATEDANALOGINPUTS);
        error += A_3000_SPR(vQuestions,vJSON.SPECIALPROTECTIONS);
        error += A_3000_AO(vQuestions,vJSON.ANALOGOUTPUTS);
        error += A_3000_SPM(vQuestions,vJSON.SPM);
        error += A_3000_ES(vQuestions,vJSON.ES);
        error += A_3000_SPL(vQuestions,vJSON.SERVICEPLAN);
        error += A_3000_MS(vQuestions,vJSON.DEVICE);
    }
    catch(e) {}
}



load_settings()






























