from django.db import models
from django.utils.text import slugify
from unidecode import unidecode

from ckeditor.fields import RichTextField

class Kategoriya(models.Model):
    class Meta:
        verbose_name_plural = "Kategoriya"
    nomi = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nomi
    
class URL(models.Model):
    class Meta:
        verbose_name_plural = "URL"
    nomi = models.CharField(max_length=50)
    kategoriya = models.ForeignKey(
        Kategoriya,
        on_delete=models.CASCADE,
        related_name='children',
    )
    code = models.CharField(max_length=100, blank=True)

    
    def __str__(self):
        return self.nomi
    

class Post(models.Model):
    nomi = models.CharField(max_length=250)
    qisqacha = models.CharField(max_length=250)
    matni = RichTextField()
    sana = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(unique=True, null=True, blank=True)
    toplam = models.CharField(max_length=100)
    rasm = models.ImageField(upload_to="uploads/", null=True, blank=True)
    def save(self, *args, **kwargs):
        self.slug = slugify(unidecode(self.nomi))
        super(Post,self).save(*args, **kwargs)