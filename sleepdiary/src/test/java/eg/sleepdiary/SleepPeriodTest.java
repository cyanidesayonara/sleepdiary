package eg.sleepdiary;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import eg.sleepdiary.domain.SleepPeriod;
import eg.sleepdiary.domain.User;
import eg.sleepdiary.domain.UserLevel;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDateTime;

@RunWith(SpringRunner.class)
public class SleepPeriodTest {

	private SleepPeriod testPeriod;
	private LocalDateTime start;
	private LocalDateTime end;
	private User user;
	private final String userName = "testi";

	@Before
	public void init() {
		start = LocalDateTime.of(2019, 10, 1, 0, 0);
		end = LocalDateTime.of(2019, 10, 2, 0, 0);
		user = new User(userName, userName, userName, userName, userName, UserLevel.BASIC);
		testPeriod = new SleepPeriod(start, end, user);
	}

	@Test
	public void constructorWorks() {
		assertThat(testPeriod).isNotNull();
		assertThat(testPeriod.getStartTime()).isEqualTo(start).isNotEqualTo(end);
		assertThat(testPeriod.getEndTime()).isEqualTo(end).isNotEqualTo(start);
		assertThat(testPeriod.getUser()).isEqualTo(user);
	}
	
	@Test
	public void getDurationReturnsTheCorrectLength() {
		assertThat(testPeriod.getDuration()).isEqualTo(24).isNotEqualTo(0);
	}

}
