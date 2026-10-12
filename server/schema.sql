CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'student'
    CHECK (role IN ('student', 'admin')),
  is_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  reset_token VARCHAR(255),
  reset_expires TIMESTAMP,
  xp INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  created_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE levels (
  id SERIAL PRIMARY KEY,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  level_number INT NOT NULL,
  title VARCHAR(150),
  difficulty INT DEFAULT 1,
  text_content TEXT NOT NULL,
  min_wpm INT DEFAULT 20,
  min_accuracy INT DEFAULT 90
);

CREATE TABLE attempts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  level_id INT REFERENCES levels(id) ON DELETE CASCADE,
  wpm NUMERIC(5,2),
  accuracy NUMERIC(5,2),
  duration_sec INT,
  missed_keys TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE progress (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  current_level INT DEFAULT 1,
  completed BOOLEAN DEFAULT FALSE,
  UNIQUE (user_id, course_id)
);

CREATE TABLE certificates (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  course_id INT REFERENCES courses(id),
  avg_wpm NUMERIC(5,2),
  avg_accuracy NUMERIC(5,2),
  issued_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE forum_posts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  parent_id INT REFERENCES forum_posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);