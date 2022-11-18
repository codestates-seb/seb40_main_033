package server.team33.payment;

import lombok.Data;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@Data
public class ReadyResponse {

    private String tid;
    private String next_redirect_pc_url;
    private String partner_order_id;
    private ZonedDateTime create_at = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));

}
