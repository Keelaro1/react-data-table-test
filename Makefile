run:
	docker run -d -p 3000:80 --rm --name reacttable-c reacttable
stop:
	docker stop reacttable-c