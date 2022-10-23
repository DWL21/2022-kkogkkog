package com.woowacourse.kkogkkog.slack;

import java.util.Collections;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class SlackController {

    @GetMapping("/code")
    public ResponseEntity<SlackOpenIdConnectUserInfo> login(@RequestParam String code) {
        SlackOpenIdConnectTokenResponse response = slackOpenIdConnectToken(code);
        String accessToken = response.getAccessToken();

        SlackOpenIdConnectUserInfo userInfo = slackConnectUserInfo(accessToken);
        return ResponseEntity.ok(userInfo);
    }

    private SlackOpenIdConnectTokenResponse slackOpenIdConnectToken(String code) {
        RestTemplate restTemplate = new RestTemplate();
        String requestUrl = "https://slack.com/api/openid.connect.token";

        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("client_id", "4274003170465.4274015409041");
        parameters.add("client_secret", "3001a9f1f43da41ab06684f68a8ad667");
        parameters.add("redirect_uri", "https://kkogkkog.com/redirect");
        parameters.add("code", code);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(parameters, headers);

        return restTemplate.postForObject(requestUrl, httpEntity, SlackOpenIdConnectTokenResponse.class);
    }

    private SlackOpenIdConnectUserInfo slackConnectUserInfo(String token) {
        RestTemplate restTemplate = new RestTemplate();
        String requestUrl = "https://slack.com/api/openid.connect.userInfo";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(headers);

        return restTemplate.postForObject(requestUrl, httpEntity, SlackOpenIdConnectUserInfo.class);
    }

    @GetMapping("/bot")
    public ResponseEntity<SlackOpenIdConnectUserInfo> installSlackBot(@RequestParam String code) {
        SlackOpenIdConnectTokenResponse response = slackOpenIdConnectToken(code);
        String accessToken = response.getAccessToken();

        SlackOpenIdConnectUserInfo userInfo = slackConnectUserInfo(accessToken);
        return ResponseEntity.ok(userInfo);
    }

}
