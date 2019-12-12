package eg.sleepdiary.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;

/**
 * 
 * @author marhyvar A class that represents the Comment table in the database
 *
 */
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String comment;
	private LocalDateTime commentDate;
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name="users_id")
	private User user;
	private SleepQuality sleepQuality;
	
	public Comment(String comment, LocalDateTime commentDate, User user, SleepQuality sleepQuality) {
		super();
		this.comment = comment;
		this.commentDate = commentDate;
		this.user = user;
		this.sleepQuality = sleepQuality;
	}
	
}
