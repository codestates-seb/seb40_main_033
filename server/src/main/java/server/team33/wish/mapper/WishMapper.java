package server.team33.wish.mapper;

import org.mapstruct.Mapper;
import server.team33.wish.dto.WishResponseDto;
import server.team33.wish.entity.Wish;

@Mapper(componentModel = "spring")
public interface WishMapper {

    default WishResponseDto wishToWishDto(Wish wish) {
        WishResponseDto wishResponseDto = new WishResponseDto();

        wishResponseDto.setItemId(wish.getItem().getItemId());
        wishResponseDto.setWish(wish.getIsWish());
        wishResponseDto.setTotalWishes(wish.getItem().getTotalWishes());

        return wishResponseDto;
    }

}
