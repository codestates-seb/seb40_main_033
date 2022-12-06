package server.team33.jasyptConfig;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class JasyptConfigTest {
    @Test
    void jasypt() throws Exception {
        //given
        //when
        String clientId = "606086322984-lusr30r8j649fjrc12ta8sagdq6nh57s.apps.googleusercontent.com";
        String clientSercet = "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";
        String clientId2 = "8bd02271846053cc63735a08226924b3";
        String clientSecret2 = "SMvvzV3I7vhxkPnlTybcS50D1YMyfnav";
        String secretKey = "sdfsdfsdfesdfdf11113456645454534545451";

        String encryptUrl = jasyptEncrypt(clientId);
        System.out.println("encryptUrl = " + encryptUrl);
        String encryptSecret = jasyptEncrypt(clientSercet);
        System.out.println("encryptSecret = " + encryptSecret);
        String encryptId2 = jasyptEncrypt(clientId2);
        System.out.println("encryptId2 = " + encryptId2);
        String clientSecret = jasyptEncrypt(clientSecret2);
        System.out.println("clientSecret = " + clientSecret);
        String encryptSecretKey = jasyptEncrypt(secretKey);
        System.out.println("encryptSecretKey = " + encryptSecretKey);


        assertThat(clientId).isEqualTo(jasyptDecryt(encryptUrl));
        //then
    }

    private String jasyptEncrypt( String input){

        String key = "1234";
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        encryptor.setPassword(key);
        return encryptor.encrypt(input);
    }
    private String jasyptDecryt(String input){
        String key = "1234";
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        encryptor.setPassword(key);
        return encryptor.decrypt(input);
    }
}