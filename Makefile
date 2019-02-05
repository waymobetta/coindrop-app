.PHONY: install
install:
	@yarn install

.PHONY: start
start:
	@yarn start

.PHONY: swagger
swagger:
	@echo 'copying swagger spec'
	@cp ~/go/src/github.com/waymobetta/go-coindrop-api/swagger/swagger.json src/swagger/

.PHONY: lint
lint:
	@npm run lint:fix
