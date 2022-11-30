package server.team33.wish.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import server.team33.item.entity.Brand;
import server.team33.nutritionFact.dto.NutritionFactDto;
import server.team33.nutritionFact.entity.NutritionFact;

import java.util.List;

public class WishDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WishItemResponseDto {
        private long itemId;
        private String thumbnail;
        private String title;
        private String content;
        private int capacity;
        private int price;
        private Brand brand;
        private List<NutritionFactDto.Response> nutritionFacts;
        private double starAvg;
        private int reviewSize;
    }





    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WishResponseDto {
        private long itemId;
        private int wish;
        private int totalWishes;
    }

}
