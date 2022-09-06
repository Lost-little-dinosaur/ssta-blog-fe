import axios from 'axios';

var jwtToken = JSON.parse(String(localStorage.getItem('jwtToken')));
if (jwtToken==null){
    var request = axios.create({//封装axios，request也是一个axios，就是多了一些配置
        baseURL: 'http://localhost:8088',
        headers: {
            'Authorization': jwtToken
        },
    });
}else{
    var request = axios.create({//封装axios，request也是一个axios，就是多了一些配置
        baseURL: 'http://localhost:8088',
    });
}


export default request;