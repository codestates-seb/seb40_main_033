package server.team33;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class Team33Application {

	public static void main(String[] args) {
		SpringApplication.run(Team33Application.class, args);
	}

}
