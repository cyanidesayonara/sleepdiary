package eg.sleepdiary.domain;

import org.springframework.security.core.userdetails.UserDetails;

public interface SecurityService {
    String findLoggedInUsername();

    UserDetails autologin(String userName, String password);
}