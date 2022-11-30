package server.team33.payment.dto;

import lombok.Getter;

@Getter
public class KakaoPayApproveDto {

    private String aid;
    private String tid;
    private String cid;
    private String sid;
    private String partner_order_id;
    private String partner_user_id;
    private String payment_method_type;
    private String item_name;
    private String item_code;
    private String created_at;
    private String approved_at;
    private String payload;
    private Amount amount;
    private int quantity;

    @Getter
    public static class Amount {
        private int total;
        private int tax_free;
        private int vat;
        private int discount;
    }

}
