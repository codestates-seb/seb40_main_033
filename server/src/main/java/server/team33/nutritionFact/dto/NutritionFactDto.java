package server.team33.nutritionFact.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class NutritionFactDto {

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post {
        private String ingredient;
        private String volume;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response {

        private String ingredient;
        private String volume;
    }
}
