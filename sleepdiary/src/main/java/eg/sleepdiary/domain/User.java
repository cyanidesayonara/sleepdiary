package eg.sleepdiary.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.data.annotation.Transient;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "\"user\"")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String userName, firstName, lastName, email;
	private String password;
	private UserLevel userLevel;

	@Transient
	private String passwordConfirm;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="user")
	private List<Comment> comments;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="user")
	private List<SleepPeriod> sleepPeriods;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="user")
	private List<External> externals;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Permission> user;
	
	@OneToMany(mappedBy = "supervisor", cascade = CascadeType.ALL)
	private List<Permission> supervisor = new ArrayList<>();
	
	public User(String userName, String firstName, String lastName, String email, 
			String password, UserLevel userLevel) {
		this.userName = userName;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.userLevel = userLevel;
	}

	public User(String userName, String firstName, String lastName, String email, 
			String password, UserLevel userLevel, Permission... permissions) {
		this.userName = userName;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.userLevel = userLevel;
		for(Permission p : permissions) {
			p.setUser(this);
		}
		this.supervisor = Stream.of(permissions).collect(Collectors.toList());
	}
	
}
