package server.team33.wish.mapper;

import org.mapstruct.Mapper;
import server.team33.item.mapper.ItemMapper;
import server.team33.wish.dto.WishDto;
import server.team33.wish.entity.Wish;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface WishMapper {

    default WishDto.WishResponseDto wishToWishDto(Wish wish) {
        WishDto.WishResponseDto wishResponseDto = new WishDto.WishResponseDto();

        wishResponseDto.setItemId(wish.getItem().getItemId());
        wishResponseDto.setWish(wish.getIsWish());
        wishResponseDto.setTotalWishes(wish.getItem().getTotalWishes());

        return wishResponseDto;
    }


    default WishDto.WishItemResponseDto wishToWishItemDto(Wish wish, ItemMapper itemMapper) {
        WishDto.WishItemResponseDto wishItemResponseDto = new WishDto.WishItemResponseDto();

        wishItemResponseDto.setItemId(wish.getItem().getItemId());
        wishItemResponseDto.setThumbnail(wish.getItem().getThumbnail());
        wishItemResponseDto.setTitle(wish.getItem().getTitle());
        wishItemResponseDto.setContent(wish.getItem().getContent());
        wishItemResponseDto.setCapacity(wish.getItem().getCapacity());
        wishItemResponseDto.setPrice(wish.getItem().getPrice());
        wishItemResponseDto.setDiscountRate(wish.getItem().getDiscountRate());
        wishItemResponseDto.setDiscountPrice(wish.getItem().getDiscountPrice());
        wishItemResponseDto.setBrand(wish.getItem().getBrand());
        wishItemResponseDto.setNutritionFacts(
                itemMapper.nutritionFactToNutritionFactResponseDto(wish.getItem().getNutritionFacts()));
        wishItemResponseDto.setStarAvg(wish.getItem().getStarAvg());
        wishItemResponseDto.setReviewSize(wish.getItem().getReviews().size());

        return wishItemResponseDto;
    }

    default List<WishDto.WishItemResponseDto> wishesToWishItemResponse(List<Wish> wishes, ItemMapper itemMapper) {
        if (wishes == null) return null;

        List<WishDto.WishItemResponseDto> wishItemResponses = new ArrayList<>();

        for (Wish wish : wishes) {
            System.out.println("============================");
            System.out.println(wish.getItem().getItemId());
            System.out.println("===========================");
            wishItemResponses.add(wishToWishItemDto(wish, itemMapper));
        }

        return wishItemResponses;
    }
}
