.PHONY: swagger
swagger:
	@echo 'copying swagger spec'
	@cp ~/go/src/github.com/waymobetta/go-coindrop-api/swagger/swagger.json src/swagger/
