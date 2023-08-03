run:
	docker run -d -p 3000:80 --rm --name reacttable-c keelaro1/reacttable
stop:
	docker stop reacttable-c