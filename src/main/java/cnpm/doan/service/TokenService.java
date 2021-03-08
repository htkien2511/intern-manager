package cnpm.doan.service;


import cnpm.doan.entity.Token;

public interface TokenService {

    Token createToken(Token token);

    Token findByToken(String token);
}
