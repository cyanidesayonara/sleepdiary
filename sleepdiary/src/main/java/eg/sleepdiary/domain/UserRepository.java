package eg.sleepdiary.domain;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    boolean existsByUserName(String userName);

    User findOneByUserName(String userName);
}
