package eg.sleepdiary.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Permission implements Serializable {
	/**
	 * heittää warningia jos ei ole serialVersionUID:tä, ei jaksa googlettaa mitä se tarkoittaa
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@ManyToOne
	@JoinColumn
	@JsonIgnore
	private User user;
	
	@ManyToOne
	@JoinColumn
	@JsonIgnore
	private User supervisor;
	
	public Permission(User supervisor) {
		this.supervisor = supervisor;
	}
	
	@Override
	public boolean equals(Object o) {
		if(this == o) {
			return true;
		}
		if(!(o instanceof Permission)) {
			return false;
		}
		Permission that = (Permission) o;
		return Objects.equals(user.getUserName(), that.user.getUserName()) &&
				Objects.equals(supervisor.getUserName(), that.supervisor.getUserName());
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(user.getUserName(), supervisor.getUserName());
	}
}
