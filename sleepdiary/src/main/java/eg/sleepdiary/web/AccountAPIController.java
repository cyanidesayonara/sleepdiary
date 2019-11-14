package eg.sleepdiary.web;

import eg.sleepdiary.domain.User;
import eg.sleepdiary.domain.UserRepository;
import eg.sleepdiary.domain.SecurityService;
import eg.sleepdiary.validator.LoginValidator;
import eg.sleepdiary.validator.RegisterValidator;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("api/account/")
public class AccountAPIController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private LoginValidator loginValidator;

    @Autowired
    private RegisterValidator registerValidator;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid User user, BindingResult bindingResult) {
        log.info("Logging in User : {}", user);
        
        loginValidator.validate(user, bindingResult);
        
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        log.info("sdfdsf");
        UserDetails userDetails = securityService.autologin(user.getUserName(), user.getPassword());
        log.info("sdfdsf");
        return new ResponseEntity<UserDetails>(userDetails, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid User user, BindingResult bindingResult) {
        log.info("Registering User : {}", user);
        
        registerValidator.validate(user, bindingResult);
        
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        User createdUser = userRepository.save(user);
        UserDetails userDetails = securityService.autologin(createdUser.getUserName(), createdUser.getPasswordConfirm());
        return new ResponseEntity<UserDetails>(userDetails, HttpStatus.OK);
    }
}