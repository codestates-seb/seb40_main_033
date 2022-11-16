package server.team33.audit;

import lombok.Getter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.ZonedDateTime;

@Getter
@MappedSuperclass // 해당 클래스를 상속받는 엔티티에서 해당클래스의 필드를 컬럼으로 사용가능
@EntityListeners(AuditingEntityListener.class) // Auditing기능을 수행하는 리스너를 등록
public abstract class Auditable {
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    @PrePersist
    public void prePersist(){
        this.createdAt = ZonedDateTime.now();
        this.updatedAt = ZonedDateTime.now();
    }

    @PreUpdate
    public void preUpdate(){
        this.updatedAt = ZonedDateTime.now();
    }

}
