package com.woowacourse.kkogkkog.slack;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SlackOpenIdConnectTokenResponse {

    private String ok;

    @JsonProperty("access_token")
    private String accessToken;


    public SlackOpenIdConnectTokenResponse() {
    }

    public String getOk() {
        return ok;
    }

    public String getAccessToken() {
        return accessToken;
    }
}
