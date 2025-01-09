const isValidTime= (time)=>{
    const [hour,minute]= time.split(':').map(Number)
    const totalMinutes= hour * 60 + minute
    const startTiime= 8 * 60
    const endTiime= 17 * 60 
    
    return totalMinutes >= startTiime && totalMinutes < endTiime
}

export const dateFormValidate = (inputs) => {

    const errors= {};
    const {date, time} = inputs;
    
    console.log(date);
    console.log(time);

    const selectDateTime = new Date(`${date}T${time}`);  
    const now = new Date();
    const oursLater= new Date(now.getTime() -3 * 60 * 60 * 1000);

    console.log("selectDateTime:", selectDateTime);  
    console.log("now:", now);  
    console.log("oursLater:", oursLater);  

    if(!date){
        errors.date= "La Fecha es olbigatoria"
    }else if(selectDateTime < now ){
        errors.date= "La Fecha debe ser mayor a la actual"
    }else if(selectDateTime < oursLater){
        errors.date= "No se pueden agendar citas con menos de 24hrs de antelación"
    }else if(selectDateTime.getDay() === 0 ||
    selectDateTime.getDay() === 6){
        errors.date= "No se puede agendar citas los fines de semana"
    }

    if(!time){
        errors.time= "La Hora es olbigatoria"
    }else if(!isValidTime(time)){
        errors.time= "La Hora debe estar en el rango de 8:00 a 17:00 "
    }

    return errors
}

