package server.team33.item.mapper;

import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;
import server.team33.category.dto.CategoryDto;
import server.team33.category.entity.Category;
import server.team33.item.dto.ItemDto;
import server.team33.item.dto.ItemSimpleResponseDto;
import server.team33.item.entity.Item;
import server.team33.item.service.ItemService;
import server.team33.nutritionFact.dto.NutritionFactDto;
import server.team33.nutritionFact.entity.NutritionFact;
import server.team33.response.MultiResponseDto;
import server.team33.review.entity.Review;
import server.team33.review.mapper.ReviewMapper;
import server.team33.review.service.ReviewService;
import server.team33.talk.entity.Talk;
import server.team33.talk.mapper.TalkMapper;
import server.team33.talk.service.TalkService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring")
public interface ItemMapper {

    default ItemDto.ItemDetailResponse itemToItemDetailResponseDto(Item item) {
        ItemDto.ItemDetailResponse itemDetailResponseDto = new ItemDto.ItemDetailResponse();

        itemDetailResponseDto.setItemId(item.getItemId());
        itemDetailResponseDto.setThumbnail(item.getThumbnail());
        itemDetailResponseDto.setDescriptionImage(item.getDescriptionImage());
        itemDetailResponseDto.setTitle(item.getTitle());
        itemDetailResponseDto.setContent(item.getContent());
        itemDetailResponseDto.setExpiration(item.getExpiration());
        itemDetailResponseDto.setBrand(item.getBrand());
        itemDetailResponseDto.setSales(item.getSales());
        itemDetailResponseDto.setPrice(item.getPrice());
        itemDetailResponseDto.setCapacity(item.getCapacity());
        itemDetailResponseDto.setServingSize(item.getServingSize());
        itemDetailResponseDto.setDiscountRate(item.getDiscountRate());
        itemDetailResponseDto.setDiscountPrice(item.getDiscountPrice());
        itemDetailResponseDto.setNutritionFacts(nutritionFactToNutritionFactResponseDto(item.getNutritionFacts()));
        itemDetailResponseDto.setCategories(categoryToStringList(item.getCategories()));
        itemDetailResponseDto.setStarAvg(item.getStarAvg());
//        itemDetailResponseDto.setReviews(item.getReviews());
//        itemDetailResponseDto.setTalks(item.getTalks());

        return itemDetailResponseDto;
    }

    default ItemDto.ItemDetailResponse itemToItemDetailResponseDto(Item item, ReviewService reviewService, ReviewMapper reviewMapper,
                                                                   TalkService talkService, TalkMapper talkMapper,
                                                                   int reviewPage, int reviewSize, int talkPage, int talkSize) { // 아이템 상세 조회

        ItemDto.ItemDetailResponse itemDetailResponseDto = new ItemDto.ItemDetailResponse();

        itemDetailResponseDto.setItemId(item.getItemId());
        itemDetailResponseDto.setThumbnail(item.getThumbnail());
        itemDetailResponseDto.setDescriptionImage(item.getDescriptionImage());
        itemDetailResponseDto.setTitle(item.getTitle());
        itemDetailResponseDto.setContent(item.getContent());
        itemDetailResponseDto.setExpiration(item.getExpiration());
        itemDetailResponseDto.setBrand(item.getBrand());
        itemDetailResponseDto.setSales(item.getSales());
        itemDetailResponseDto.setPrice(item.getPrice());
        itemDetailResponseDto.setCapacity(item.getCapacity());
        itemDetailResponseDto.setServingSize(item.getServingSize());
        itemDetailResponseDto.setDiscountRate(item.getDiscountRate());
        itemDetailResponseDto.setDiscountPrice(item.getDiscountPrice());
        itemDetailResponseDto.setNutritionFacts(nutritionFactToNutritionFactResponseDto(item.getNutritionFacts()));
        itemDetailResponseDto.setCategories(categoryToStringList(item.getCategories()));
        itemDetailResponseDto.setStarAvg(item.getStarAvg());

        Page<Review> pageReview = reviewService.findItemReviews(item, reviewPage, reviewSize);
        List<Review> reviews = pageReview.getContent();
        itemDetailResponseDto.setReviews(new MultiResponseDto<>(reviewMapper.reviewsToReviewResponseDtos(reviews), pageReview));

        Page<Talk> pageTalk = talkService.findItemTalks(item, talkPage, talkSize);
        List<Talk> talks = pageTalk.getContent();
        itemDetailResponseDto.setTalks(new MultiResponseDto<>(talkMapper.talksToTalkAndCommentDtos(talks), pageTalk));

        return itemDetailResponseDto;
    }

    default Item itemPostDtoToItem(ItemDto.post post) {
        System.out.println("==================="+post);
        Item item = new Item();

        item.setThumbnail(post.getThumbnail());
        item.setDescriptionImage(post.getDescriptionImage());
        item.setDiscountRate(post.getDiscountRate());
        item.setCapacity(post.getCapacity());
        item.setPrice(post.getPrice());
        item.setView(0);
        item.setSales(post.getSales());
        item.setTitle(post.getTitle());
        item.setBrand(post.getBrand());
        item.setContent(post.getContent());
        item.setExpiration(post.getExpiration());
        item.setDiscountPrice(post.getDiscountPrice());
        item.setCategories(categoryPostDtoToCategory(post.getCategories(), item));
        item.setServingSize(post.getServingSize());
        item.setNutritionFacts(nutritionFactPostDtoToNutritionFact(post.getNutritionFacts(), item));
        item.setStarAvg(post.getStarAvg());
//        item.setReviews(post.getReviews());
//        item.setTalks(post.getTalks());

        return item;
    }

    default List<NutritionFactDto.Response> nutritionFactToNutritionFactResponseDto(List<NutritionFact> nutritionFacts) {
        return nutritionFacts.stream().map(nutritionFact -> {
            NutritionFactDto.Response response = new NutritionFactDto.Response();

            response.setIngredient(nutritionFact.getIngredient());
            response.setVolume(nutritionFact.getVolume());
            return response;
        }).collect(Collectors.toList());
    }

    default List<NutritionFact> nutritionFactPostDtoToNutritionFact(List<NutritionFactDto.Post> posts, Item item) {
        return posts.stream().map(post -> {
            NutritionFact nutritionFact = new NutritionFact();

            nutritionFact.setIngredient(post.getIngredient());
            nutritionFact.setVolume(post.getVolume());
            nutritionFact.setItem(item);
            return nutritionFact;
        }).collect(Collectors.toList());
    }

    default List<String> categoryToStringList(List<Category> categories) {
        return categories.stream().map(Category::getCategoryName).collect(Collectors.toList());
    }


//    default List<CategoryDto.Response> categoryToCategoryResponseDto(List<Category> categories) {
//        return categories.stream().map(category -> {
//            CategoryDto.Response response = new CategoryDto.Response();
//
//            response.setCategoryName(category.getCategoryName());
//            return response;
//        }).collect(Collectors.toList());
//    }


    default List<Category> categoryPostDtoToCategory(List<CategoryDto.Post> posts, Item item) {
        return posts.stream().map(post -> {
            Category category = new Category();

            category.setCategoryName(post.getCategoryName());
            category.setItem(item);
            return category;
        }).collect(Collectors.toList());
    }



    default ItemDto.ItemCategoryResponse itemToItemCategoryResponseDto(Item item) {
        ItemDto.ItemCategoryResponse itemCategoryResponse = new ItemDto.ItemCategoryResponse();

        itemCategoryResponse.setItemId(item.getItemId());
        itemCategoryResponse.setThumbnail(item.getThumbnail());
        itemCategoryResponse.setTitle(item.getTitle());
        itemCategoryResponse.setContent(item.getContent());
        itemCategoryResponse.setCapacity(item.getCapacity());
        itemCategoryResponse.setPrice(item.getPrice());
        itemCategoryResponse.setDiscountRate(item.getDiscountRate());
        itemCategoryResponse.setDiscountPrice(item.getDiscountPrice());
        itemCategoryResponse.setStarAvg(item.getStarAvg());
        itemCategoryResponse.setReviewSize(item.getReviews().size());
        itemCategoryResponse.setBrand(item.getBrand());
        itemCategoryResponse.setNutritionFacts(nutritionFactToNutritionFactResponseDto(item.getNutritionFacts()));

        return itemCategoryResponse;
    }

    default List<ItemDto.ItemCategoryResponse> itemsToItemCategoryResponseDto(List<Item> items) {
        if(items == null) return null;

        List<ItemDto.ItemCategoryResponse> itemCategoryResponses = new ArrayList<>();

        for(Item item : items) {
            System.out.println(item.getItemId());
            itemCategoryResponses.add(itemToItemCategoryResponseDto(item));
        }

        return itemCategoryResponses;
    }


    default ItemSimpleResponseDto itemToItemSimpleResponseDto(Item item) {
        ItemSimpleResponseDto itemSimpleResponseDto = new ItemSimpleResponseDto();
        itemSimpleResponseDto.setItemId(item.getItemId());
        itemSimpleResponseDto.setBrand(item.getBrand());
        itemSimpleResponseDto.setThumbnail(item.getThumbnail());
        itemSimpleResponseDto.setTitle(item.getTitle());
        itemSimpleResponseDto.setCapacity(item.getCapacity());
        itemSimpleResponseDto.setPrice(item.getPrice());
        itemSimpleResponseDto.setDiscountRate(item.getDiscountRate());
        itemSimpleResponseDto.setDiscountPrice(item.getDiscountPrice());

        return itemSimpleResponseDto;
    }


    default ItemDto.ItemMainTop9Response itemToItemMainTop9ResponseDto(ItemService itemService) {
        ItemDto.ItemMainTop9Response itemMainTop9Response = new ItemDto.ItemMainTop9Response();

        itemMainTop9Response.setBestItem(new MultiResponseDto<>(itemsToItemCategoryResponseDto(itemService.findTop9BestItems())));
        itemMainTop9Response.setSaleItem(new MultiResponseDto<>(itemsToItemCategoryResponseDto(itemService.findTop9SaleItems())));
        itemMainTop9Response.setMdPickItem(new MultiResponseDto<>(itemsToItemCategoryResponseDto(itemService.findTop9MdPickItems())));
        return itemMainTop9Response;
    }
}
