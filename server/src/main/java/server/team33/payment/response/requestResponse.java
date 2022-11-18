package server.team33.payment.response;

import lombok.Data;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@Data
public class requestResponse {

    private String tid;
    private String next_redirect_pc_url;
    private ZonedDateTime create_at = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));

}
