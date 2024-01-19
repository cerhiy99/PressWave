const getIdLanguage=(language)=>{
    language=language.toUpperCase();
    return language==process.env.IDLANGUAGE1?
            1
        :
            language==process.env.IDLANGUAGE2
                ?
                    2
                :
                    language==process.env.IDLANGUAGE3
                    ?
                        3
                    :
                        "error";
}

module.exports=getIdLanguage;