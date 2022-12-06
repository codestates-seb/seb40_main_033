package server.team33.category.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
public class CategoryDto {

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post {
        private String categoryName;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response {
        private String categoryName;
    }
}
