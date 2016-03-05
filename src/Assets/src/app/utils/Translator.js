export function translate(data, default_locale){
    let translate_data = JSON.parse(data)

    let tranlated = translate_data[0].value;



    translate_data.map((tdata)=>{
       if(tdata.locale == default_locale)
           tranlated = tdata.value;

    });

    return tranlated;
}