package server.team33.payment;

import lombok.Data;

@Data
public class Amount {
    private int total;
    private int tax_free;
    private int vat;
    private int discount;
}
