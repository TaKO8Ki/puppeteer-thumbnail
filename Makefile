FIG = docker-compose

build:
	@$(FIG) build
up:
	@$(FIG) up
down:
	@$(FIG) down
restart:
	@$(FIG) stop
	@$(FIG) start
clean:
	@docker image prune
	@docker volume prune

