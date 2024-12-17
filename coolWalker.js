let cw, ch;
let agents;
let radialSpeed = 1.0; // Velocidad radial
let angularSpeed = 1.0; // Velocidad angular

function setup() {
  cw = windowWidth;
  ch = windowHeight;
  createCanvas(cw, ch);
  background("#E2E2E2");
  angleMode(DEGREES);
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = 5;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = "rgba(0,0,0,0.2)";
  agents = [];
  for (let i = 0; i < 4; i++) {
    agents.push({
      r: 0,
      a: 90 * i,
      dir: 1,
      color: random(0, 160),
    });
  }
}

function draw() {
  translate(cw / 2, ch / 2);
  noFill();
  for (let agent of agents) {
    stroke(agent.color);
    strokeWeight(map(agent.r, 0, min(cw, ch), 0.5, 4));
    let x = agent.r * cos(agent.a);
    let y = agent.r * sin(agent.a);
    if (x > cw / 2 || x < -cw / 2 || y > ch / 2 || y < -ch / 2) {
      agent.die = true;
      continue;
    }
    let d = map(agent.r, 0, min(cw, ch), 5, 30);

    if (agent.target) {
      let newAngle = agent.a + random(1, 2) * agent.dir * angularSpeed;
      if (agent.dir === 1) {
        arc(0, 0, agent.r * 2, agent.r * 2, agent.a, newAngle);
      } else {
        arc(0, 0, agent.r * 2, agent.r * 2, newAngle, agent.a);
      }
      if (abs(newAngle - agent.target) < 1) {
        agent.target = null;
      }
      agent.a = newAngle;
    } else {
      if (random() < 0.2) {
        agent.dir = random([-1, 1]);
        agent.target = agent.a + random(10, 30) * agent.dir;
      } else {
        agent.r += d * random(0.8, 1.5) * radialSpeed;
        let nx = agent.r * cos(agent.a);
        let ny = agent.r * sin(agent.a);
        line(x, y, nx, ny);
      }
    }
    if (random() < 0.01) {
      agents.push({
        r: agent.r,
        a: agent.a,
        dir: agent.dir,
        color: random(0, 160),
      });
    }
  }
  agents = agents.filter((agent) => !agent.die);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    radialSpeed += 0.1;
  } else if (keyCode === DOWN_ARROW) {
    radialSpeed = max(0.1, radialSpeed - 0.1);
  }
  if (keyCode === RIGHT_ARROW) {
    angularSpeed += 0.1;
  } else if (keyCode === LEFT_ARROW) {
    angularSpeed = max(0.1, angularSpeed - 0.1);
  }
}

function mousePressed() {
  background("#E2E2E2");
  agents = [];
  for (let i = 0; i < 4; i++) {
    agents.push({
      r: 0,
      a: 90 * i,
      dir: 1,
      color: random(0, 160),
    });
  }
}
