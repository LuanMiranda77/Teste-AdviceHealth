import { api } from "../../../../config/api";
import { login, logout } from "../../../../config/auth";
import { EstabelecimentoType, UserAplicationType } from "../../../../domain";
import { Cargo } from "../../../../domain/enums";
import { UtilsUserLocal } from "../../../../utils/utils_userLocal";


/**
*@Author
*@Issue
*/
export class UsuarioService {

  url='api/usuario';
  auth='/token';
  erro='';

  public UserException(message: string) : any {
    return {error : message};
 }

  public async login(pEntity : any) {
 
        if(pEntity.email != "luanprof30@gmail.com" && pEntity.password != "123456"){
            throw  this.UserException("InvalidMonthNo");
        }

        let userLogado = {
            email:"luanprof30@gmail.com",
            nome:'Luan Miranda',
            cargo: Cargo.MASTER,
            status:"S",
            roles:"1.2.3",
            estabelecimento: {
              nome:"Clinica do trabalho",
              cnpj:'032553660000122'
            } as EstabelecimentoType  
          } as UserAplicationType;
          UtilsUserLocal.setTokenLogin(userLogado);
          logout();
          return userLogado;
    
  }

  public async recuperarSenha(pEntity: any){
      const response = await api.post(this.url+'/recuperasenha', pEntity)
      .then( resp =>{
          return resp.data;
      })
      .catch(error => {
          return Promise.reject(error.response.data[0]);
      });
      return response;
  }

  public async trocarSenha(user: UserAplicationType){
      const response = await api.put(this.url+`/${user.id}`, user)
      .then( resp =>{
          return resp.data;
      })
      .catch(error => {
          console.log(error);
          return Promise.reject(error.response.data[0]);
      });
      return response;
  }

  public async save(user: UserAplicationType){
    const response = await api.post(this.url, user)
    .then( resp =>{
        return resp.data;
    })
    .catch(error => {
        console.log(error);
        return Promise.reject(error.response.data[0]);
    });
    return response;
 }

 public async update(user: UserAplicationType){
    const response = await api.put(this.url, user)
    .then( resp =>{
        return resp.data;
    })
    .catch(error => {
        console.log(error);
        return Promise.reject(error.response.data[0]);
    });
    return response;
 }

  public async getUsuarios(estabelecimento: number){
    const response = await api.get(this.url+`/estabelecimento/${estabelecimento}`)
    .then( resp =>{
        return resp.data;
    })
    .catch(error => {
        console.log(error);
        return Promise.reject(error.response.data[0]);
    });
    return Promise.resolve(response);
  }

  public async setStatus( id:number, status: string){
    const response = await api.put(this.url+`/status/${id}/${status}`)
    .then( resp =>{
        return resp.data;
    })
    .catch(error => {
        console.log(error);
        return Promise.reject(error.response.data[0]);
    });
    return Promise.resolve(response);
  }
  
    
  
}