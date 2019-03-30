function extractFormData(form){
    let data = new FormData(form);         
        data = data.entries();
        let obj = data.next();
        let retrieved = {};
        while (undefined !== obj.value) {
            retrieved[obj.value[0]] = obj.value[1];
            obj = data.next();
        }  
        return retrieved;    
}

export default extractFormData;
