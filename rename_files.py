import os

i = 0
for f in os.listdir("test_dir"):
    if os.path.isfile(os.path.join("test_dir",f)):
        os.rename("test_dir/%s" % f, "test_dir/%d.png" % i)
        i += 1