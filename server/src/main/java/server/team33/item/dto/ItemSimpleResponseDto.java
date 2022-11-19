package server.team33.item.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemSimpleResponseDto {

    private long itemId;
//    private Brand brand;
    private String thumbnail;
    private String title;
    private int servingSize;
    private int price;
    private int discountRate;
    private int disCountPrice;
}
